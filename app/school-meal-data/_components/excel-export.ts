"use client";
// components/ExcelExportButton.tsx
// import * as XLSX from "xlsx";
export class ExcelOutput {

  private csvContent: string;
  private blobType: string;
  constructor() {
    this.csvContent = "";
    this.blobType = "text/csv;charset=utf-8";
  }
  private escapeAndQuote(value: string) {
    console.log("value >> ",value)
    let escapedValue
    if(value){
      escapedValue = value.toString().replace(/"/g, '""')
      return `"${escapedValue}"`;
    }else{  
      return ``;
      // escapedValue = ""
      // return `"${escapedValue}"`;
    }
   
   
  }
  addData(data: any[]) {
    this.csvContent += data
      .map((row) => row.map(this.escapeAndQuote).join(","))
      .join("\n");
  }
  saveToFile(filename: string): void {
    const blob = new Blob([this.csvContent], { type: this.blobType });
    const url = window.URL.createObjectURL(blob);
    // Create a temporary anchor element to trigger the download
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = filename;
    // Trigger the download
    downloadLink.click();
    // Clean up
    window.URL.revokeObjectURL(url);
  }
}
