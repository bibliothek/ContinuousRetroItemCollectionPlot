import { Component, ViewChild, ElementRef } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'excel-to-chart';

  public graph = {
    data: [],
    layout: {
      hovermode: 'closest'
    }
  };
  public config = {
    displayModeBar: false
  }

  public fileChanged(event): void {

    const file = event.target.files[0];

    const fileReader = new FileReader();
    fileReader.onload = () => {
      let arrayBuffer = fileReader.result as ArrayBuffer;
      var data = new Uint8Array(arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: 'binary', cellDates: true, cellNF: false, cellText: false });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      const sheetData = XLSX.utils.sheet_to_json(worksheet, { dateNF: "YYYY-MM-DD" })

      const x = [];
      const y = [];
      const labels = [];

      for (let entry of sheetData) {
        x.push(entry['Fertigstellungszeit']);
        y.push(entry['What is your mood today?']);
        let label = entry['Name'] + ': ' + entry['What made you feel that way?']
        labels.push(label);
      }
      const trace = {
        x: x,
        y: y,
        textposition: 'top center',
        mode: 'markers+text',
        type: 'scatter',
        text: labels
      }
      this.graph.data = [trace];
    }
    fileReader.readAsArrayBuffer(file);
  }

}
