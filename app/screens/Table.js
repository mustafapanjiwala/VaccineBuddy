export const createTable = (age, vaccines, due_on, given_on, brands) => {
  let count = 0;
  return `
  <!DOCTYPE html>
  <html>
  <head>
  <title>PDF CONTENT</title>
  <style type="text/css">
  .tg {
      border-collapse: collapse;
      /* border-color: #2C5E93; */
      border-spacing: 0;
  }

  .tg td {
      background-color: #f8f8f8;
      border-color: #000;
      border-style: solid;
      border-width: .5px;
      border-top-width: 0px;
      color: #444;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-weight: 600;
      font-size: 14px;
      overflow: hidden;
      padding: 15px 40px;
      word-break: normal;
  }
  td:nth-child(2){
      background-color: #0a8d943a;
  }

  .tg th {
      background-color: #0A8C94;
      border-color: #2C5E93;
      border-style: solid;
      border-width: 0px;
      color: rgb(255, 255, 255);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-weight: 300;
      font-size: 14px;
      font-weight: normal;
      overflow: hidden;
      padding: 10px 5px;
      word-break: normal;
  }

  .tg .tg-cly1 {
      text-align: center;
      vertical-align: middle
  }

  .tg .tg-lqy6 {
      text-align: center;
      vertical-align: top
  }

  .tg .tg-0lax {
      text-align: center;
      vertical-align: top
  }

  .tg .tg-nrix {
      text-align: center;
      vertical-align: middle
  }
</style>
  </head>
  <body>
<div>
<table class="tg">
<thead>
  <tr>
    <th class="tg-lqy6">AGE<br></th>
    <th class="tg-0lax">VACCINES</th>
    <th class="tg-0lax">DUE DATE</th>
    <th class="tg-0lax">GIVEN ON</th>
    <th class="tg-0lax">BRAND NAME</th>
  </tr>
</thead>
<tbody>
 ${age.map((a, i) => `
  <tr>
    <td class="tg-nrix" rowspan="${vaccines[i].length}">${a}</td>
    <td class="tg-0lax">${vaccines[i][0]}</td>
    <td class="tg-0lax">${due_on[count]}</td>
    <td class="tg-0lax">${given_on[count]}</td>
    <td class="tg-0lax">${brands[count]}</td>
  </tr>
  ${vaccines[i].map((vac, index) => {
    if (index !== 0) {
      let markup = `
      <tr>
        <td class="tg-0lax">${vaccines[i][index]}</td>
        <td class="tg-0lax">${due_on[count]}</td>
        <td class="tg-0lax">${given_on[count]}</td>
        <td class="tg-0lax">${brands[count]}</td>
      </tr>
      `
      count++
      return (markup)
    }
    count++
  }).join("")}
 `).join("")}
</tbody>
</table>
</div>
  </body>
  </html>       
`
}






const table_back = `
  <!DOCTYPE html>
  <html>
  <head>
  <title>PDF CONTENT</title>
  <style type="text/css">
.tg  {border-collapse:collapse;border-color:#9ABAD9;border-spacing:0;}
.tg td{background-color:#EBF5FF;border-color:#9ABAD9;border-style:solid;border-width:1px;color:#444;
  font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{background-color:#409cff;border-color:#9ABAD9;border-style:solid;border-width:1px;color:#fff;
  font-family:Arial, sans-serif;font-size:14px;font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-cly1{text-align:left;vertical-align:middle}
.tg .tg-lqy6{text-align:right;vertical-align:top}
.tg .tg-0lax{text-align:left;vertical-align:top}
.tg .tg-nrix{text-align:center;vertical-align:middle}
</style>
  </head>
  <body>
<table class="tg">
<thead>
  <tr>
    <th class="tg-lqy6">AGE<br></th>
    <th class="tg-0lax">VACCINES</th>
    <th class="tg-0lax">DUE DATE</th>
    <th class="tg-0lax">GIVEN ON</th>
    <th class="tg-0lax">BRAND NAME</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-nrix" rowspan="3">Birth</td>
    <td class="tg-0lax">BCG</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax">HB 1</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax">OPV 0</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-cly1" rowspan="6">6 Weeks</td>
    <td class="tg-0lax">DTwP/DTaP</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax">HiB 1</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax">IPV 1</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax">HB 2</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax">PCV 1</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax">Rota 1</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-cly1" rowspan="6">10 Weeks</td>
    <td class="tg-0lax">DTwP/DTaP 2</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax">HiB 2</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax">IPV 2</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax">HB 3</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax">PCV 2</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax">Rota 2</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-cly1" rowspan="6">14 Weeks</td>
    <td class="tg-0lax">DTwP/DTaP 3<br></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax">HiB 3</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax">IPV 3</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax">HB 4</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax">PCV 3</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax">Rota 3</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-cly1">6 Months</td>
    <td class="tg-0lax">TCV</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-cly1" rowspan="6">5 Years</td>
    <td class="tg-0lax">Influenza</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax">Year 1 Dose 1</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax">Year 1 Dose 2</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax">Year 2</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax">Year 3</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax">Year 4</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
</tbody>
</table>
  </body>
  </html>       
`