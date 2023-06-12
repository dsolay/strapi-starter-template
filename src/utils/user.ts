export const getService = (name = 'user') => {
  return strapi.plugin('users-permissions').service(name)
}

export const getQuery = (name = 'user') => {
  return strapi.db.query(`plugin::users-permissions.${name}`)
}
