import { faker } from '@faker-js/faker' //FAKE DATA GENERATOR INSTEAD OF USING A WRITTEN LIST
import { randomInt } from 'crypto'

function generateValue(type) {
  const imageLinks = [
    'https://picsum.photos/200',
    'https://picsum.photos/300',
    'https://picsum.photos/400/300',
    'https://picsum.photos/seed/picsum/300/300',
    'https://picsum.photos/500/300',
    'https://randomuser.me/api/portraits/men/1.jpg',
    'https://randomuser.me/api/portraits/women/2.jpg',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
    'https://via.placeholder.com/300x300?text=Image',
  ] //LINKS FOR IMAGES FROM INTERNET

  switch (type) {
    case 'number':
    case 'integer':
      return faker.number.int({ min: 1, max: 100 })

    case 'float':
      return faker.number.float({ min: 1, max: 100 })

    case 'string':
      return faker.string.alpha(5)

    case 'email':
      return faker.internet.email()

    case 'name':
      return faker.person.fullName()

    case 'phone':
      return faker.phone.number()

    case 'boolean':
      return faker.datatype.boolean()

    case 'uuid':
      return faker.string.uuid()

    case 'image_url':
      return imageLinks[randomInt(imageLinks.length)]

    case 'file_url':
      return faker.internet.url()

    case 'date':
      return faker.date.recent().toISOString()

    default:
      return null
  }
}

function generateFromSchema(schema) {
  const result = {}

  for (const key in schema) {
    const field = schema[key]

    // 🔹 Primitive / Semantic
    if (typeof field === 'string') {
      result[key] = generateValue(field.toLowerCase())
    }

    // 🔹 Object
    else if (field.type === 'object') {
      result[key] = generateFromSchema(field.schema)
    }

    // 🔹 Array
    else if (field.type === 'array') {
      const length = field.length ?? randomInt(1, 5)
      const items = []

      for (let i = 0; i < length; i++) {
        if (typeof field.items === 'string') {
          items.push(generateValue(field.items.toLowerCase()))
        } else if (field.items.type === 'object') {
          items.push(generateFromSchema(field.items.schema))
        }
      }

      result[key] = items
    }

    // 🔹 Unknown
    else {
      result[key] = null
    }
  }

  return result
}

export default generateFromSchema
