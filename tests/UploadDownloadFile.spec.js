//created folder - excelJsUtil
// bash, npm init - to create package.json file
// https://www.npmjs.com/package/exceljs
//  bash npm install exceljs --savejs  //for the package to be download and anyone can access on bashing npm i only to get all the all the dependcies
// downloaded excel file from the https://rahulshettyacademy.com/upload-download-test/

// To run the js file - node filename

import { test, expect } from "@playwright/test";
import ExcelJs from "exceljs";
async function excelTest(searchText, replaceText, change, filePath) {
  // here from the library exceljs , we are getting the class first ExcelJs // added "type": "module", in package.json manually
  // have to create the object for the class ExcelJs and this object now includes all the methods , like workbook and all and can fetch
  const workbook = new ExcelJs.Workbook();
  // cmd+option+C to copy the file in the folder itelf get the targeted sheet
  // it should holds the await otherwise js will go the next step to excecute the line the file will be reading
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet("Sheet1");

  //   worksheet.eachRow((row, rowNumber) => {
  //     row.eachCell((cell, colNumber) => {
  //       //   console.log(cell.value);
  //       //   if (cell.value === "Apple") {
  //       //     console.log(rowNumber, cellNumber);
  //       //   }
  //       if (cell.value === "Banana") {
  //         output.row = rowNumber;
  //         output.cell = colNumber;
  //       }
  //     });
  //   });

  const output = await readExcel(worksheet, searchText);

  //   write into excel
  //   it's hardcoded 3,2 if not hardcoded we have to create the object and passit above n here as well
  //   const cell = worksheet.getCell(3, 2);
  const cell = worksheet.getCell(output.row, output.column + change.colChange);
  cell.value = replaceText;
  await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet, searchText) {
  let output = { row: -1, column: -1 };
  // here we are going through row , cell on adding the for loop
  await worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      //   console.log(cell.value);
      //   if (cell.value === "Apple") {
      //     console.log(rowNumber, cellNumber);
      //   }
      if (cell.value === searchText) {
        output.row = rowNumber;
        output.column = colNumber;
      }
    });
  });
  return output;
}

// should call the function at the end
// excelTest(
//   "Mango",
//   350,
//   { rowChange: 0, colChange: 2 },
//   "/Users/poojachanapannavar/Downloads/excelDownloadTest.xlsx"
// );

test("upload and download excel vlaidation", async ({ page }) => {
  const textSearch = "Mango";
  const updatedText = "350";
  const downloadFilePath = "/Users/poojachanapannavar/Downloads/download.xlsx";
  await page.goto(
    "https://rahulshettyacademy.com/upload-download-test/index.html"
  );
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download" }).click();
  //   await page.locator("button:has-text('Download')").click();
  //   need to add this excejs dependency in package.json and bash npm install
  //   "dependencies": {
  //     "exceljs": "^4.4.0"
  //   }
  const download = await downloadPromise;
  // to save explicitly in the system
  await download.saveAs(downloadFilePath);
  excelTest(
    textSearch,
    updatedText,
    { rowChange: 0, colChange: 2 },
    "/Users/poojachanapannavar/Downloads/download.xlsx"
  );
  //   choosing the file
  await page.locator("#fileinput").click();
  //   inbuilt playwright method to choose the file from the system and upload
  //   attribute type should be "file"
  await page.locator("#fileinput").setInputFiles(downloadFilePath);

  const textlocator = page.getByText(textSearch);
  // here passing the locator
  const desiredRow = page.getByRole("row").filter({ has: textlocator });
  await expect(desiredRow.locator("#cell-4-undefined")).toContainText(
    updatedText
  );
});
