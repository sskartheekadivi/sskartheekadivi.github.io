import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import PdfPrinter from 'pdfmake'; // Using PdfPrinter for server-side generation

// CONFIGURATION
const RESUME_SOURCE_FILE = 'src/content/resume/me.md';
const OUTPUT_FILE = 'public/resume.pdf';

// Define font paths
const fonts = {
  'RobotoCondensed': {
    normal: 'fonts/RobotoCondensed/web/static/RobotoCondensed-Regular.ttf',
    bold: 'fonts/RobotoCondensed/web/static/RobotoCondensed-Bold.ttf',
    italics: 'fonts/RobotoCondensed/web/static/RobotoCondensed-Italic.ttf',
    bolditalics: 'fonts/RobotoCondensed/web/static/RobotoCondensed-BoldItalic.ttf'
  },
  'SourceSans3': {
    normal: 'fonts/SourceSans3/TTF/SourceSans3-Regular.ttf',
    bold: 'fonts/SourceSans3/TTF/SourceSans3-Bold.ttf',
    italics: 'fonts/SourceSans3/TTF/SourceSans3-It.ttf',
    bolditalics: 'fonts/SourceSans3/TTF/SourceSans3-BoldIt.ttf'
  }
};

// Helper function to create a section
const createSection = (title, content, isFirst = false) => {
  const header = isFirst ? [] : [{ canvas: [{ type: 'line', x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 0.5, lineColor: '#cccccc' }], margin: [0, 10, 0, 10] }];
  return [
    ...header,
    { text: title, style: 'sectionHeader' },
    ...(content || [])
  ];
};

(async () => {
  console.log(`\n📄 Starting PDF Generation...`);

  // 1. Read and parse resume data
  const filePath = path.join(process.cwd(), RESUME_SOURCE_FILE);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data: resume, content: summary } = matter(fileContents);

  // Initialize PDF printer
  const printer = new PdfPrinter(fonts);

  // Define the document
  const docDefinition = {
    content: [
      // Header
      { text: resume.name, style: 'header' },
      { text: resume.tagline, style: 'tagline' },
      {
        columns: [
          resume.email ? { text: resume.email, style: 'contactInfo' } : '',
          resume.phone ? { text: `| ${resume.phone}`, style: 'contactInfo' } : '',
          resume.website ? { text: `| ${resume.website}`, style: 'contactInfo', link: `https://${resume.website}` } : '',
          resume.linkedin ? { text: `| LinkedIn`, style: 'contactInfo', link: `https://${resume.linkedin}` } : ''
        ],
        columnGap: 5,
        alignment: 'center',
        margin: [0, 5, 0, 15] // top, right, bottom, left
      },
      { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1, lineColor: '#0f172a' }], margin: [0, 0, 0, 15] },

      // Summary
      ...createSection('Summary', [{ text: summary, style: 'summaryText', margin: [0, 0, 0, 10] }], true),

      // Skills
      ...createSection('Technical Skills', [
        {
          columns: [
            {
              width: '100%',
              stack: Object.entries(resume.skills).map(([category, skills]) => ({
                columns: [
                  { text: category.charAt(0).toUpperCase() + category.slice(1), style: 'skillCategory', width: '20%' },
                  { text: skills.join(', '), style: 'skillList', width: '80%' }
                ],
                margin: [0, 0, 0, 5]
              }))
            }
          ],
          margin: [0, 0, 0, 10]
        }
      ]),

      // Experience
      ...createSection('Experience', resume.experience.map(item => ([
        {
          columns: [
            { text: item.role, style: 'itemHeader' },
            { text: item.dates, style: 'date', alignment: 'right' }
          ]
        },
        { text: `${item.company} — ${item.location}`, style: 'itemSubheader' },
        {
          ul: item.details.map(detail => ({ text: detail, style: 'bulletPoint' })),
          margin: [0, 5, 0, 15]
        }
      ]))),

      // Education
      ...createSection('Education', resume.education.map(item => ([
        {
          columns: [
            { text: item.degree, style: 'itemHeader' },
            { text: item.dates, style: 'date', alignment: 'right' }
          ]
        },
        { text: `${item.school} — ${item.location}`, style: 'itemSubheader', margin: [0, 0, 0, 15] },
      ]))),

      // Certifications
      ...createSection('Certifications', resume.certifications.map(item => ([
        {
          columns: [
            { text: item.title, style: 'itemHeader' },
            { text: item.date, style: 'date', alignment: 'right' }
          ]
        },
        { text: item.url, style: 'link', link: item.url, margin: [0, 2, 0, 10] }
      ]))),

      // Talks & Publications
      ...createSection('Talks & Publications', resume.talks.map(item => ([
        {
          columns: [
            { text: item.title, style: 'itemHeader' },
            { text: item.date, style: 'date', alignment: 'right' }
          ]
        },
        { text: item.url, style: 'link', link: item.url, margin: [0, 2, 0, 10] }
      ]))),

      // Awards
      ...createSection('Awards', resume.awards.map(item => ({
        columns: [
          { text: item.title, style: 'itemHeader' },
          { text: item.date, style: 'date', alignment: 'right' }
        ],
        margin: [0, 0, 0, 10]
      }))),
    ],
    styles: {
      header: { fontSize: 32, bold: true, alignment: 'center', font: 'RobotoCondensed', color: '#0f172a', margin: [0, 0, 0, 5] },
      tagline: { fontSize: 11, alignment: 'center', font: 'RobotoCondensed', color: '#2563eb', margin: [0, 0, 0, 10], bold: true },
      contactInfo: { fontSize: 9, color: '#64748b', font: 'SourceSans3' },
      sectionHeader: { fontSize: 14, bold: true, margin: [0, 0, 0, 10], color: '#0f172a', font: 'RobotoCondensed' },
      summaryText: { fontSize: 10, color: '#64748b', alignment: 'justify', lineHeight: 1.3, font: 'SourceSans3' },
      skillCategory: { fontSize: 10, bold: true, color: '#0f172a', font: 'RobotoCondensed' },
      skillList: { fontSize: 10, color: '#64748b', font: 'SourceSans3' },
      itemHeader: { fontSize: 11, bold: true, color: '#0f172a', font: 'RobotoCondensed' },
      date: { fontSize: 9, bold: true, color: '#2563eb', font: 'RobotoCondensed' },
      itemSubheader: { fontSize: 10, italic: true, color: '#64748b', font: 'SourceSans3', margin: [0, 2, 0, 5] },
      bulletPoint: { fontSize: 10, color: '#64748b', font: 'SourceSans3', lineHeight: 1.3 },
      link: { fontSize: 9, color: '#2563eb', decoration: 'underline' }
    },
    defaultStyle: { font: 'SourceSans3' },
    pageMargins: [40, 40, 40, 40]
  };

  // Generate PDF
  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  pdfDoc.pipe(fs.createWriteStream(OUTPUT_FILE));
  pdfDoc.end();

  console.log(`✅ Success! PDF saved to: ${OUTPUT_FILE}`);
  console.log(`   You can now link to it at /resume.pdf\n`);

})();
