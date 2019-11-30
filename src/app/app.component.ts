import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'excel-to-chart';

  arrayBuffer: any;

  sheetData: any;

  public fileChanged(event): void {

    const file = event.target.files[0];

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, {type:'binary', cellDates:true, cellNF: false, cellText:false});
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      this.sheetData = XLSX.utils.sheet_to_json(worksheet, {dateNF:"YYYY-MM-DD"})
      console.log(this.sheetData);
    }
    fileReader.readAsArrayBuffer(file);
  }

}
