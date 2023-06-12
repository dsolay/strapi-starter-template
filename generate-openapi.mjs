import { promises } from 'fs'
import path from 'path'
import pluralize from 'pluralize'
import nunjucks from 'nunjucks'
import yaml from 'js-yaml'
import { filter } from 'async'

const mapTypes = {
  json: { type: 'object' },
  text: { type: 'string' },
  email: { type: 'string', format: 'email' },
  richtext: { type: 'string' },
  datetime: { type: 'string', format: 'date-time' },
  date: { type: 'string', format: 'date' },
  enumeration: { type: 'string' },
  boolean: { type: 'boolean' },
  string: { type: 'string' },
  integer: { type: 'integer' },
  decimal: { type: 'number', format: 'double' },
  media: { type: 'integer' },
  manyToOne: { oneOf: [{ type: 'integer' }, { type: 'object' }] },
  oneToMany: {
    type: 'array',
    items: { oneOf: [{ type: 'integer' }, { type: 'object' }] },
  },
  oneToOne: { oneOf: [{ type: 'integer' }, { type: 'object' }] },
  manyToMany: {
    type: 'array',
    items: { oneOf: [{ type: 'integer' }, { type: 'object' }] },
  },
}

const configPath = './documentation/config.json'

const enviroment = new nunjucks.Environment(
  new nunjucks.FileSystemLoader('documentation/templates'),
)

enviroment.addFilter('pluralize', pluralize)

async function init() {
  const templates = {}

  templates.components = enviroment.getTemplate('components.njk')
  templates.paths = enviroment.getTemplate('paths.njk')
  templates.singlePaths = enviroment.getTemplate('single-paths.njk')
  templates.openapi = enviroment.getTemplate('openapi.njk')

  let openapi = yaml.load(templates.openapi.render({}))

  try {
    const config = JSON.parse(await promises.readFile(configPath))
    openapi = { ...openapi, ...config }

    return { templates, openapi }
  } catch {
    return { templates, openapi }
  }
}

function capitalize(text) {
  return text.slice(0, 1).toUpperCase() + text.slice(1)
}

async function getModels(base) {
  const results = await promises.readdir(base)

  return filter(results, async (file) => {
    const stats = await promises.stat(path.join(base, file))
    return stats.isDirectory()
  })
}

async function saveFile(filePath, data) {
  const directory = path.dirname(filePath)
  await promises.mkdir(directory, { recursive: true }, (error) => {
    if (error) throw error
  })

  promises.writeFile(
    filePath,
    yaml.dump(data, { forceQuotes: true }),
    (error) => {
      if (error) throw error
    },
  )
}

function getYamlDocuments(context, templates) {
  const components = yaml.load(templates.components.render(context))
  const paths = yaml.load(templates.paths.render(context))
  const singlePaths = yaml.load(templates.singlePaths.render(context))

  return { components, paths, singlePaths }
}

async function readSchemas(templates) {
  const basePath = './src/api'
  const models = await getModels(basePath)

  const openapi = {
    paths: {},
    tags: [],
  }

  for (const model of models) {
    const filePath = `${basePath}/${model}/content-types/${model}/schema.json`
    const { info, attributes } = JSON.parse(await promises.readFile(filePath))
    const context = { model: info.singularName }
    const { components, paths, singlePaths } = getYamlDocuments(
      context,
      templates,
    )
    const pluralModel = info.pluralName

    const schemaName = capitalize(context.model)
    const schema = components.components.schemas[schemaName]
    if (!schema.properties) schema.properties = {}

    for (const [key, value] of Object.entries(attributes)) {
      const type = value.type === 'relation' ? value.relation : value.type
      const properties = { ...mapTypes[type] }

      if (value.required) {
        if (!schema.required) schema.required = []

        schema.required.push(key)
      }

      if (value.type === 'enumeration')
        properties.oneOff = value.enum.map((entry) => ({ const: entry }))

      if (value.default !== undefined && value.default !== null)
        properties.default = value.default

      schema.properties[key] = properties
    }

    openapi.paths[`/${pluralModel}`] = {
      $ref: `./${pluralModel}/paths.yaml`,
    }
    openapi.paths[`/${pluralModel}/{id}`] = {
      $ref: `./${pluralModel}/single-paths.yaml`,
    }

    openapi.tags.push({
      name: capitalize(pluralModel),
      description: `Describe ${model} endpoints`,
    })

    const directory = `./documentation/${pluralModel}`

    await Promise.all([
      saveFile(`${directory}/components.yaml`, components),
      saveFile(`${directory}/paths.yaml`, paths),
      saveFile(`${directory}/single-paths.yaml`, singlePaths),
    ])
  }

  return openapi
}

async function build() {
  const { templates, openapi } = await init()
  await saveFile('./documentation/openapi.yaml', {
    ...openapi,
    ...(await readSchemas(templates)),
  })
}

await build()
