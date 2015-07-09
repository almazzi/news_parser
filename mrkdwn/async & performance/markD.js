var markdownpdf = require("markdown-pdf")
  , fs = require("fs");

//fs.createReadStream("apA.md",{flags: 'r'})
//  .pipe(markdownpdf())
//  .pipe(fs.createWriteStream("./pdfs/apA.pdf",{flags: 'w'}));

markdownpdf().from("apA.md").to("apA.pdf", function () {
  console.log("Done")
})
