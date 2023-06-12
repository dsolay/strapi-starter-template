const { each } = require('async')

async function purgeFiles({ entityId, newFiles, model, field }) {
  const service = strapi.plugin('upload').service('upload')
  const entity = await strapi.db.query(`api::${model}.${model}`).findOne({
    where: { id: entityId },
    populate: [field],
    fields: 'id',
  })

  const oldFileds = entity[field]
  if (oldFileds) {
    const files = oldFileds.filter(({ id }) => !newFiles.includes(id))

    await each(files, async (file) => await service.remove(file))
  }
}

module.exports = { purgeFiles }
