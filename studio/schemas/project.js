export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'projectName',
      title: 'Project Name',
      type: 'string',
    },
    {
      name: 'projectType',
      title: 'Project Type',
      type: 'reference',
      to: { type: 'projectType' },
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'desktopImage',
      title: 'Desktop Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'tabletImage',
      title: 'Tablet Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'mobileImage',
      title: 'Mobile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'websiteLink',
      title: 'Website Link',
      type: 'string',
    },
    {
      name: 'codeLink',
      title: 'Code Link',
      type: 'string',
    },
  ],
}
