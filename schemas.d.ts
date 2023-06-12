import {
  CollectionTypeSchema,
  StringAttribute,
  RequiredAttribute,
  SetMinMaxLength,
  JSONAttribute,
  DefaultTo,
  RelationAttribute,
  DateTimeAttribute,
  PrivateAttribute,
  EmailAttribute,
  UniqueAttribute,
  PasswordAttribute,
  BooleanAttribute,
  EnumerationAttribute,
  BigIntegerAttribute,
  IntegerAttribute,
  DecimalAttribute,
  SetMinMax,
  MediaAttribute,
  FloatAttribute,
  TextAttribute,
  DateAttribute,
} from '@strapi/strapi'

export interface AdminPermission extends CollectionTypeSchema {
  info: {
    name: 'Permission'
    description: ''
    singularName: 'permission'
    pluralName: 'permissions'
    displayName: 'Permission'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    subject: StringAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    properties: JSONAttribute & DefaultTo<{}>
    conditions: JSONAttribute & DefaultTo<[]>
    role: RelationAttribute<'admin::permission', 'manyToOne', 'admin::role'>
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface AdminUser extends CollectionTypeSchema {
  info: {
    name: 'User'
    description: ''
    singularName: 'user'
    pluralName: 'users'
    displayName: 'User'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    firstname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    lastname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    username: StringAttribute
    email: EmailAttribute &
      RequiredAttribute &
      PrivateAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 6
      }>
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6
      }>
    resetPasswordToken: StringAttribute & PrivateAttribute
    registrationToken: StringAttribute & PrivateAttribute
    isActive: BooleanAttribute & PrivateAttribute & DefaultTo<false>
    roles: RelationAttribute<'admin::user', 'manyToMany', 'admin::role'> &
      PrivateAttribute
    blocked: BooleanAttribute & PrivateAttribute & DefaultTo<false>
    preferedLanguage: StringAttribute
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
      PrivateAttribute
    updatedBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
      PrivateAttribute
  }
}

export interface AdminRole extends CollectionTypeSchema {
  info: {
    name: 'Role'
    description: ''
    singularName: 'role'
    pluralName: 'roles'
    displayName: 'Role'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    code: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    description: StringAttribute
    users: RelationAttribute<'admin::role', 'manyToMany', 'admin::user'>
    permissions: RelationAttribute<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
      PrivateAttribute
    updatedBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
      PrivateAttribute
  }
}

export interface AdminApiToken extends CollectionTypeSchema {
  info: {
    name: 'Api Token'
    singularName: 'api-token'
    pluralName: 'api-tokens'
    displayName: 'Api Token'
    description: ''
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    description: StringAttribute &
      SetMinMaxLength<{
        minLength: 1
      }> &
      DefaultTo<''>
    type: EnumerationAttribute<['read-only', 'full-access', 'custom']> &
      RequiredAttribute &
      DefaultTo<'read-only'>
    accessKey: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    lastUsedAt: DateTimeAttribute
    permissions: RelationAttribute<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >
    expiresAt: DateTimeAttribute
    lifespan: BigIntegerAttribute
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface AdminApiTokenPermission extends CollectionTypeSchema {
  info: {
    name: 'API Token Permission'
    description: ''
    singularName: 'api-token-permission'
    pluralName: 'api-token-permissions'
    displayName: 'API Token Permission'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    token: RelationAttribute<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface AdminTransferToken extends CollectionTypeSchema {
  info: {
    name: 'Transfer Token'
    singularName: 'transfer-token'
    pluralName: 'transfer-tokens'
    displayName: 'Transfer Token'
    description: ''
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    description: StringAttribute &
      SetMinMaxLength<{
        minLength: 1
      }> &
      DefaultTo<''>
    accessKey: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    lastUsedAt: DateTimeAttribute
    permissions: RelationAttribute<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >
    expiresAt: DateTimeAttribute
    lifespan: BigIntegerAttribute
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface AdminTransferTokenPermission extends CollectionTypeSchema {
  info: {
    name: 'Transfer Token Permission'
    description: ''
    singularName: 'transfer-token-permission'
    pluralName: 'transfer-token-permissions'
    displayName: 'Transfer Token Permission'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    token: RelationAttribute<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface PluginUploadFile extends CollectionTypeSchema {
  info: {
    singularName: 'file'
    pluralName: 'files'
    displayName: 'File'
    description: ''
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: StringAttribute & RequiredAttribute
    alternativeText: StringAttribute
    caption: StringAttribute
    width: IntegerAttribute
    height: IntegerAttribute
    formats: JSONAttribute
    hash: StringAttribute & RequiredAttribute
    ext: StringAttribute
    mime: StringAttribute & RequiredAttribute
    size: DecimalAttribute & RequiredAttribute
    url: StringAttribute & RequiredAttribute
    previewUrl: StringAttribute
    provider: StringAttribute & RequiredAttribute
    provider_metadata: JSONAttribute
    related: RelationAttribute<'plugin::upload.file', 'morphToMany'>
    folder: RelationAttribute<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      PrivateAttribute
    folderPath: StringAttribute &
      RequiredAttribute &
      PrivateAttribute &
      SetMinMax<{
        min: 1
      }>
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface PluginUploadFolder extends CollectionTypeSchema {
  info: {
    singularName: 'folder'
    pluralName: 'folders'
    displayName: 'Folder'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1
      }>
    pathId: IntegerAttribute & RequiredAttribute & UniqueAttribute
    parent: RelationAttribute<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >
    children: RelationAttribute<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >
    files: RelationAttribute<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >
    path: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1
      }>
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface PluginI18NLocale extends CollectionTypeSchema {
  info: {
    singularName: 'locale'
    pluralName: 'locales'
    collectionName: 'locales'
    displayName: 'Locale'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: StringAttribute &
      SetMinMax<{
        min: 1
        max: 50
      }>
    code: StringAttribute & UniqueAttribute
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface PluginUsersPermissionsPermission extends CollectionTypeSchema {
  info: {
    name: 'permission'
    description: ''
    singularName: 'permission'
    pluralName: 'permissions'
    displayName: 'Permission'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    action: StringAttribute & RequiredAttribute
    role: RelationAttribute<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface PluginUsersPermissionsRole extends CollectionTypeSchema {
  info: {
    name: 'role'
    description: ''
    singularName: 'role'
    pluralName: 'roles'
    displayName: 'Role'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 3
      }>
    description: StringAttribute
    type: StringAttribute & UniqueAttribute
    permissions: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >
    users: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface PluginUsersPermissionsUser extends CollectionTypeSchema {
  info: {
    name: 'user'
    description: ''
    singularName: 'user'
    pluralName: 'users'
    displayName: 'User'
  }
  options: {
    draftAndPublish: false
    timestamps: true
  }
  attributes: {
    username: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 3
      }>
    email: EmailAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 6
      }>
    provider: StringAttribute
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6
      }>
    resetPasswordToken: StringAttribute & PrivateAttribute
    confirmationToken: StringAttribute & PrivateAttribute
    confirmed: BooleanAttribute & DefaultTo<false>
    blocked: BooleanAttribute & DefaultTo<false>
    role: RelationAttribute<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >
    driver: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::driver.driver'
    >
    customer: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::customer.customer'
    >
    orderComments: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::order-comment.order-comment'
    >
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface ApiAddressAddress extends CollectionTypeSchema {
  info: {
    singularName: 'address'
    pluralName: 'addresses'
    displayName: 'Address'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    country: StringAttribute & RequiredAttribute
    destination: StringAttribute & RequiredAttribute
    location: JSONAttribute & RequiredAttribute
    point: JSONAttribute
    routes: RelationAttribute<
      'api::address.address',
      'oneToMany',
      'api::route.route'
    >
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'api::address.address',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'api::address.address',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface ApiBenefitBenefit extends CollectionTypeSchema {
  info: {
    singularName: 'benefit'
    pluralName: 'benefits'
    displayName: 'Benefit'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    name: StringAttribute & RequiredAttribute
    description: StringAttribute
    orders: RelationAttribute<
      'api::benefit.benefit',
      'manyToMany',
      'api::order.order'
    >
    icon: StringAttribute
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'api::benefit.benefit',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'api::benefit.benefit',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface ApiCommonRejectedReasonCommonRejectedReason
  extends CollectionTypeSchema {
  info: {
    singularName: 'common-rejected-reason'
    pluralName: 'common-rejected-reasons'
    displayName: 'CommonRejectedReason'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    reason: StringAttribute & RequiredAttribute
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'api::common-rejected-reason.common-rejected-reason',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'api::common-rejected-reason.common-rejected-reason',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface ApiContactContact extends CollectionTypeSchema {
  info: {
    singularName: 'contact'
    pluralName: 'contacts'
    displayName: 'Contact'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    name: StringAttribute & RequiredAttribute
    job: StringAttribute
    email: EmailAttribute
    phone: StringAttribute
    customerAddress: RelationAttribute<
      'api::contact.contact',
      'manyToOne',
      'api::customer-address.customer-address'
    >
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'api::contact.contact',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'api::contact.contact',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface ApiCustomerCustomer extends CollectionTypeSchema {
  info: {
    singularName: 'customer'
    pluralName: 'customers'
    displayName: 'Customer'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    name: StringAttribute & RequiredAttribute
    logo: MediaAttribute
    customer_addresses: RelationAttribute<
      'api::customer.customer',
      'oneToMany',
      'api::customer-address.customer-address'
    >
    user: RelationAttribute<
      'api::customer.customer',
      'oneToOne',
      'plugin::users-permissions.user'
    >
    discount: FloatAttribute &
      SetMinMax<{
        min: 0
        max: 1
      }> &
      DefaultTo<0>
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'api::customer.customer',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'api::customer.customer',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface ApiCustomerAddressCustomerAddress
  extends CollectionTypeSchema {
  info: {
    singularName: 'customer-address'
    pluralName: 'customer-addresses'
    displayName: 'CustomerAddress'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    type: EnumerationAttribute<['loading', 'downloading']> &
      DefaultTo<'loading'>
    default: BooleanAttribute & DefaultTo<false>
    customer: RelationAttribute<
      'api::customer-address.customer-address',
      'manyToOne',
      'api::customer.customer'
    >
    name: StringAttribute
    address: RelationAttribute<
      'api::customer-address.customer-address',
      'oneToOne',
      'api::address.address'
    >
    orders: RelationAttribute<
      'api::customer-address.customer-address',
      'oneToMany',
      'api::order.order'
    >
    contacts: RelationAttribute<
      'api::customer-address.customer-address',
      'oneToMany',
      'api::contact.contact'
    >
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'api::customer-address.customer-address',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'api::customer-address.customer-address',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface ApiDestinationFeeDestinationFee extends CollectionTypeSchema {
  info: {
    singularName: 'destination-fee'
    pluralName: 'destination-fees'
    displayName: 'DestinationFee'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    amount: DecimalAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 0
      }>
    address: RelationAttribute<
      'api::destination-fee.destination-fee',
      'oneToOne',
      'api::address.address'
    >
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'api::destination-fee.destination-fee',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'api::destination-fee.destination-fee',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface ApiDocumentDocument extends CollectionTypeSchema {
  info: {
    singularName: 'document'
    pluralName: 'documents'
    displayName: 'Document'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    name: StringAttribute & RequiredAttribute
    description: TextAttribute
    driverDocuments: RelationAttribute<
      'api::document.document',
      'oneToMany',
      'api::driver-document.driver-document'
    >
    required: BooleanAttribute & DefaultTo<false>
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'api::document.document',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'api::document.document',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface ApiDriverDriver extends CollectionTypeSchema {
  info: {
    singularName: 'driver'
    pluralName: 'drivers'
    displayName: 'Driver'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    name: StringAttribute & RequiredAttribute
    dui: StringAttribute & RequiredAttribute & UniqueAttribute
    driverLicense: StringAttribute & RequiredAttribute & UniqueAttribute
    criminalRecordDate: DateAttribute
    policeSolvencyDate: DateAttribute
    photo: MediaAttribute
    truck: RelationAttribute<
      'api::driver.driver',
      'oneToOne',
      'api::truck.truck'
    >
    user: RelationAttribute<
      'api::driver.driver',
      'oneToOne',
      'plugin::users-permissions.user'
    >
    driverRequests: RelationAttribute<
      'api::driver.driver',
      'oneToMany',
      'api::driver-request.driver-request'
    >
    profitPercentage: FloatAttribute &
      SetMinMax<{
        min: 0
        max: 1
      }> &
      DefaultTo<0>
    orders: RelationAttribute<
      'api::driver.driver',
      'oneToMany',
      'api::order.order'
    >
    driverDocuments: RelationAttribute<
      'api::driver.driver',
      'oneToMany',
      'api::driver-document.driver-document'
    >
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'api::driver.driver',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'api::driver.driver',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface ApiDriverDocumentDriverDocument extends CollectionTypeSchema {
  info: {
    singularName: 'driver-document'
    pluralName: 'driver-documents'
    displayName: 'DriverDocument'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    document: RelationAttribute<
      'api::driver-document.driver-document',
      'manyToOne',
      'api::document.document'
    >
    driver: RelationAttribute<
      'api::driver-document.driver-document',
      'manyToOne',
      'api::driver.driver'
    >
    verified: BooleanAttribute & DefaultTo<false>
    file: MediaAttribute
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'api::driver-document.driver-document',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'api::driver-document.driver-document',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface ApiDriverRequestDriverRequest extends CollectionTypeSchema {
  info: {
    singularName: 'driver-request'
    pluralName: 'driver-requests'
    displayName: 'DriverRequest'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    status: EnumerationAttribute<
      ['pending', 'accepted', 'rejected', 'canceled']
    > &
      DefaultTo<'pending'>
    rejectedReason: TextAttribute
    order: RelationAttribute<
      'api::driver-request.driver-request',
      'manyToOne',
      'api::order.order'
    >
    driver: RelationAttribute<
      'api::driver-request.driver-request',
      'manyToOne',
      'api::driver.driver'
    >
    process: BooleanAttribute & DefaultTo<false>
    owner: EnumerationAttribute<
      ['driver', 'backoffice', 'administrator', 'admin']
    > &
      DefaultTo<'driver'>
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'api::driver-request.driver-request',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'api::driver-request.driver-request',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface ApiFeeFee extends CollectionTypeSchema {
  info: {
    singularName: 'fee'
    pluralName: 'fees'
    displayName: 'Fee'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    name: StringAttribute & RequiredAttribute
    description: TextAttribute
    variable: StringAttribute
    truckFees: RelationAttribute<
      'api::fee.fee',
      'oneToMany',
      'api::truck-fee.truck-fee'
    >
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<'api::fee.fee', 'oneToOne', 'admin::user'> &
      PrivateAttribute
    updatedBy: RelationAttribute<'api::fee.fee', 'oneToOne', 'admin::user'> &
      PrivateAttribute
  }
}

export interface ApiGeofenceGeofence extends CollectionTypeSchema {
  info: {
    singularName: 'geofence'
    pluralName: 'geofences'
    displayName: 'Geofence'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    name: StringAttribute
    lat: StringAttribute
    lng: StringAttribute
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'api::geofence.geofence',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'api::geofence.geofence',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface ApiGeofenceTrackingGeofenceTracking
  extends CollectionTypeSchema {
  info: {
    singularName: 'geofence-tracking'
    pluralName: 'geofence-trackings'
    displayName: 'GeofenceTracking'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    date: DateTimeAttribute
    type: EnumerationAttribute<['manual', 'stopoff', 'start', 'end']>
    lat: StringAttribute
    lng: StringAttribute
    order: RelationAttribute<
      'api::geofence-tracking.geofence-tracking',
      'manyToOne',
      'api::order.order'
    >
    action: EnumerationAttribute<['in', 'out']>
    name: StringAttribute
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'api::geofence-tracking.geofence-tracking',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'api::geofence-tracking.geofence-tracking',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface ApiOrderOrder extends CollectionTypeSchema {
  info: {
    singularName: 'order'
    pluralName: 'orders'
    displayName: 'Order'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    international: BooleanAttribute & DefaultTo<false>
    price: DecimalAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 0
      }>
    schedule: DateTimeAttribute & RequiredAttribute
    comment: TextAttribute
    travelDays: FloatAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 0
      }>
    oneWayKilometers: FloatAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 0
      }>
    driver: RelationAttribute<
      'api::order.order',
      'manyToOne',
      'api::driver.driver'
    >
    customer: RelationAttribute<
      'api::order.order',
      'oneToOne',
      'api::customer.customer'
    >
    benefits: RelationAttribute<
      'api::order.order',
      'manyToMany',
      'api::benefit.benefit'
    >
    truckType: RelationAttribute<
      'api::order.order',
      'oneToOne',
      'api::truck-type.truck-type'
    >
    truckSize: RelationAttribute<
      'api::order.order',
      'oneToOne',
      'api::truck-size.truck-size'
    >
    stopOffs: RelationAttribute<
      'api::order.order',
      'oneToMany',
      'api::stop-off.stop-off'
    >
    driverRequests: RelationAttribute<
      'api::order.order',
      'oneToMany',
      'api::driver-request.driver-request'
    >
    loadingLocation: RelationAttribute<
      'api::order.order',
      'manyToOne',
      'api::customer-address.customer-address'
    >
    dischargeLocation: RelationAttribute<
      'api::order.order',
      'manyToOne',
      'api::customer-address.customer-address'
    >
    flete: DecimalAttribute &
      SetMinMax<{
        min: 0
      }> &
      DefaultTo<0>
    driverPayment: FloatAttribute &
      SetMinMax<{
        min: 0
      }> &
      DefaultTo<0>
    fuelGallons: FloatAttribute &
      SetMinMax<{
        min: 0
      }> &
      DefaultTo<0>
    fuelPrice: DecimalAttribute &
      SetMinMax<{
        min: 0
      }> &
      DefaultTo<0>
    ccf: FloatAttribute &
      SetMinMax<{
        min: 0
      }> &
      DefaultTo<0>
    billingTransport: StringAttribute
    billingMovilogix: StringAttribute
    fleteTransport: DecimalAttribute &
      SetMinMax<{
        min: 0
      }> &
      DefaultTo<0>
    thirdPartyExpenses: DecimalAttribute &
      SetMinMax<{
        min: 0
      }> &
      DefaultTo<0>
    thirdPartyPayment: DecimalAttribute & DefaultTo<0>
    thirdPartyPaymentDate: DateAttribute
    margin: DecimalAttribute &
      SetMinMax<{
        min: 0
      }> &
      DefaultTo<0>
    percentageMargin: FloatAttribute &
      SetMinMax<{
        min: 0
        max: 1
      }> &
      DefaultTo<0>
    fuelTotal: DecimalAttribute &
      SetMinMax<{
        min: 0
      }> &
      DefaultTo<0>
    order_status_histories: RelationAttribute<
      'api::order.order',
      'oneToMany',
      'api::order-status-history.order-status-history'
    >
    status: EnumerationAttribute<
      [
        'pending',
        'pending-authorization',
        'take-by-drivers',
        'pre-assigned',
        'assigned',
        'in-route-to-client',
        'loading',
        'in-route',
        'downloading',
        'completed',
      ]
    > &
      DefaultTo<'pending'>
    rawPrice: DecimalAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 0
      }> &
      DefaultTo<0>
    collectionDate: DateAttribute
    geofenceTrackings: RelationAttribute<
      'api::order.order',
      'oneToMany',
      'api::geofence-tracking.geofence-tracking'
    >
    driverProfit: FloatAttribute &
      SetMinMax<{
        min: 0
      }> &
      DefaultTo<0>
    moviProfit: FloatAttribute &
      SetMinMax<{
        min: 0
      }> &
      DefaultTo<0>
    formulaDetails: JSONAttribute & RequiredAttribute
    marginIva: DecimalAttribute &
      SetMinMax<{
        min: 0
      }> &
      DefaultTo<0>
    percentageMarginIva: DecimalAttribute &
      SetMinMax<{
        min: 0
      }> &
      DefaultTo<0>
    iva: DecimalAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 0
      }> &
      DefaultTo<0>
    orderComments: RelationAttribute<
      'api::order.order',
      'oneToMany',
      'api::order-comment.order-comment'
    >
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'api::order.order',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'api::order.order',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface ApiOrderCommentOrderComment extends CollectionTypeSchema {
  info: {
    singularName: 'order-comment'
    pluralName: 'order-comments'
    displayName: 'OrderComment'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    comment: TextAttribute & RequiredAttribute
    order: RelationAttribute<
      'api::order-comment.order-comment',
      'manyToOne',
      'api::order.order'
    >
    user: RelationAttribute<
      'api::order-comment.order-comment',
      'manyToOne',
      'plugin::users-permissions.user'
    >
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'api::order-comment.order-comment',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'api::order-comment.order-comment',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface ApiOrderStatusHistoryOrderStatusHistory
  extends CollectionTypeSchema {
  info: {
    singularName: 'order-status-history'
    pluralName: 'order-status-histories'
    displayName: 'OrderStatusHistory'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    status: EnumerationAttribute<
      [
        'pending',
        'pending-authorization',
        'take-by-drivers',
        'pre-assigned',
        'assigned',
        'in-route-to-client',
        'loading',
        'in-route',
        'downloading',
        'completed',
      ]
    > &
      RequiredAttribute
    order: RelationAttribute<
      'api::order-status-history.order-status-history',
      'manyToOne',
      'api::order.order'
    >
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'api::order-status-history.order-status-history',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'api::order-status-history.order-status-history',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface ApiRouteRoute extends CollectionTypeSchema {
  info: {
    singularName: 'route'
    pluralName: 'routes'
    displayName: 'Route'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    waypoints: JSONAttribute
    distance: FloatAttribute
    from: RelationAttribute<
      'api::route.route',
      'manyToOne',
      'api::address.address'
    >
    to: RelationAttribute<
      'api::route.route',
      'manyToOne',
      'api::address.address'
    >
    type: EnumerationAttribute<['default', 'custom']> & DefaultTo<'custom'>
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'api::route.route',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'api::route.route',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface ApiSettingSetting extends CollectionTypeSchema {
  info: {
    singularName: 'setting'
    pluralName: 'settings'
    displayName: 'Setting'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    customerDiscount: FloatAttribute &
      SetMinMax<{
        min: 0
        max: 1
      }> &
      DefaultTo<0>
    driverProfit: FloatAttribute &
      SetMinMax<{
        min: 0
        max: 1
      }> &
      DefaultTo<0>
    moviProfit: FloatAttribute &
      SetMinMax<{
        min: 0
        max: 1
      }> &
      DefaultTo<0>
    radio: IntegerAttribute & DefaultTo<5>
    nextMultiple: IntegerAttribute &
      SetMinMax<{
        min: 0
      }> &
      DefaultTo<5>
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'api::setting.setting',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'api::setting.setting',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface ApiStopOffStopOff extends CollectionTypeSchema {
  info: {
    singularName: 'stop-off'
    pluralName: 'stop-offs'
    displayName: 'StopOff'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    step: IntegerAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1
      }>
    order: RelationAttribute<
      'api::stop-off.stop-off',
      'manyToOne',
      'api::order.order'
    >
    address: RelationAttribute<
      'api::stop-off.stop-off',
      'oneToOne',
      'api::address.address'
    >
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'api::stop-off.stop-off',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'api::stop-off.stop-off',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface ApiTravelDayTravelDay extends CollectionTypeSchema {
  info: {
    singularName: 'travel-day'
    pluralName: 'travel-days'
    displayName: 'TravelDay'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    days: IntegerAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 0
      }>
    From: StringAttribute & RequiredAttribute
    To: StringAttribute & RequiredAttribute
    slugFrom: StringAttribute
    slugTo: StringAttribute
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'api::travel-day.travel-day',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'api::travel-day.travel-day',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface ApiTruckTruck extends CollectionTypeSchema {
  info: {
    singularName: 'truck'
    pluralName: 'trucks'
    displayName: 'Truck'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    licenseHead: StringAttribute & RequiredAttribute & UniqueAttribute
    licenseRe: StringAttribute & RequiredAttribute & UniqueAttribute
    typeRe: StringAttribute & RequiredAttribute
    codeSv: StringAttribute & RequiredAttribute & UniqueAttribute
    axesNumbers: IntegerAttribute &
      SetMinMax<{
        min: 0
      }> &
      DefaultTo<0>
    lastTireInspectionDate: DateAttribute
    lastMaintenanceInspectionDate: DateAttribute
    driver: RelationAttribute<
      'api::truck.truck',
      'oneToOne',
      'api::driver.driver'
    >
    truckType: RelationAttribute<
      'api::truck.truck',
      'manyToOne',
      'api::truck-type.truck-type'
    >
    truckSize: RelationAttribute<
      'api::truck.truck',
      'manyToOne',
      'api::truck-size.truck-size'
    >
    truckModels: RelationAttribute<
      'api::truck.truck',
      'oneToMany',
      'api::truck-model.truck-model'
    >
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'api::truck.truck',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'api::truck.truck',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface ApiTruckFeeTruckFee extends CollectionTypeSchema {
  info: {
    singularName: 'truck-fee'
    pluralName: 'truck-fees'
    displayName: 'TruckFee'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    truckType: RelationAttribute<
      'api::truck-fee.truck-fee',
      'manyToOne',
      'api::truck-type.truck-type'
    >
    truckSize: RelationAttribute<
      'api::truck-fee.truck-fee',
      'manyToOne',
      'api::truck-size.truck-size'
    >
    fee: RelationAttribute<
      'api::truck-fee.truck-fee',
      'manyToOne',
      'api::fee.fee'
    >
    amount: FloatAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 0
      }> &
      DefaultTo<0>
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'api::truck-fee.truck-fee',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'api::truck-fee.truck-fee',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface ApiTruckModelTruckModel extends CollectionTypeSchema {
  info: {
    singularName: 'truck-model'
    pluralName: 'truck-models'
    displayName: 'TruckModel'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    color: StringAttribute & RequiredAttribute
    truck: RelationAttribute<
      'api::truck-model.truck-model',
      'manyToOne',
      'api::truck.truck'
    >
    photos: MediaAttribute
    colorCode: StringAttribute & RequiredAttribute
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'api::truck-model.truck-model',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'api::truck-model.truck-model',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface ApiTruckSizeTruckSize extends CollectionTypeSchema {
  info: {
    singularName: 'truck-size'
    pluralName: 'truck-sizes'
    displayName: 'TruckSize'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    size: IntegerAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1
      }>
    unit: StringAttribute & RequiredAttribute
    derscription: TextAttribute
    trucks: RelationAttribute<
      'api::truck-size.truck-size',
      'oneToMany',
      'api::truck.truck'
    >
    truckFees: RelationAttribute<
      'api::truck-size.truck-size',
      'oneToMany',
      'api::truck-fee.truck-fee'
    >
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'api::truck-size.truck-size',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'api::truck-size.truck-size',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface ApiTruckTemplateTruckTemplate extends CollectionTypeSchema {
  info: {
    singularName: 'truck-template'
    pluralName: 'truck-templates'
    displayName: 'TruckTemplate'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    diagrams: MediaAttribute
    photo: MediaAttribute & RequiredAttribute
    truckType: RelationAttribute<
      'api::truck-template.truck-template',
      'oneToOne',
      'api::truck-type.truck-type'
    >
    truckSize: RelationAttribute<
      'api::truck-template.truck-template',
      'oneToOne',
      'api::truck-size.truck-size'
    >
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'api::truck-template.truck-template',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'api::truck-template.truck-template',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface ApiTruckTypeTruckType extends CollectionTypeSchema {
  info: {
    singularName: 'truck-type'
    pluralName: 'truck-types'
    displayName: 'TruckType'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    type: StringAttribute & RequiredAttribute
    description: TextAttribute
    trucks: RelationAttribute<
      'api::truck-type.truck-type',
      'oneToMany',
      'api::truck.truck'
    >
    truckFees: RelationAttribute<
      'api::truck-type.truck-type',
      'oneToMany',
      'api::truck-fee.truck-fee'
    >
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'api::truck-type.truck-type',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'api::truck-type.truck-type',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

declare global {
  namespace Strapi {
    interface Schemas {
      'admin::permission': AdminPermission
      'admin::user': AdminUser
      'admin::role': AdminRole
      'admin::api-token': AdminApiToken
      'admin::api-token-permission': AdminApiTokenPermission
      'admin::transfer-token': AdminTransferToken
      'admin::transfer-token-permission': AdminTransferTokenPermission
      'plugin::upload.file': PluginUploadFile
      'plugin::upload.folder': PluginUploadFolder
      'plugin::i18n.locale': PluginI18NLocale
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission
      'plugin::users-permissions.role': PluginUsersPermissionsRole
      'plugin::users-permissions.user': PluginUsersPermissionsUser
      'api::address.address': ApiAddressAddress
      'api::benefit.benefit': ApiBenefitBenefit
      'api::common-rejected-reason.common-rejected-reason': ApiCommonRejectedReasonCommonRejectedReason
      'api::contact.contact': ApiContactContact
      'api::customer.customer': ApiCustomerCustomer
      'api::customer-address.customer-address': ApiCustomerAddressCustomerAddress
      'api::destination-fee.destination-fee': ApiDestinationFeeDestinationFee
      'api::document.document': ApiDocumentDocument
      'api::driver.driver': ApiDriverDriver
      'api::driver-document.driver-document': ApiDriverDocumentDriverDocument
      'api::driver-request.driver-request': ApiDriverRequestDriverRequest
      'api::fee.fee': ApiFeeFee
      'api::geofence.geofence': ApiGeofenceGeofence
      'api::geofence-tracking.geofence-tracking': ApiGeofenceTrackingGeofenceTracking
      'api::order.order': ApiOrderOrder
      'api::order-comment.order-comment': ApiOrderCommentOrderComment
      'api::order-status-history.order-status-history': ApiOrderStatusHistoryOrderStatusHistory
      'api::route.route': ApiRouteRoute
      'api::setting.setting': ApiSettingSetting
      'api::stop-off.stop-off': ApiStopOffStopOff
      'api::travel-day.travel-day': ApiTravelDayTravelDay
      'api::truck.truck': ApiTruckTruck
      'api::truck-fee.truck-fee': ApiTruckFeeTruckFee
      'api::truck-model.truck-model': ApiTruckModelTruckModel
      'api::truck-size.truck-size': ApiTruckSizeTruckSize
      'api::truck-template.truck-template': ApiTruckTemplateTruckTemplate
      'api::truck-type.truck-type': ApiTruckTypeTruckType
    }
  }
}
