// HERE I AM DECLARING THE CONST VARIABLE OF URL AND HAVING IT HOLD MY LOCAL JSON FILE.
const URL = "/public/test1.json";

/* USING FETCH TO CALL LOCAL FILE, WHICH RETURNS A PROMISE, WHEN RESPONSE IS RECEIVED 
WE RETURN RESPONSE WITH JSON METHOD ATTACHED. .JSON ALLOWS JS PARSING. TURLS FILE TO JAVASCRIPT OBJECT */
fetch(URL)
  .then(function (resp) {
    return resp.json();
  })

//   ONCE CONVERTED, JSON DATA CAN BE MANIPULATED IN THIS FUNCTION.
  .then(function (data) {

    /* HTML VARIABLE IS DECLARED SET TO EQUAL THE API INFORMATION,
    WHILE ITERATING (.MAP) OVER THE STATUS OF THE DATA AND PRINTING IT TO THE SCREEN. */
    const html = data.DATA.map((stat) => {
      
      // USING REGEX TO LOOK FOR STATUS WORDS AND REPLACING THEM WITH BOLDED VERSION ON SCREEN.
      let str = stat.status;
      const mapObj = {
        inactive: "<b>inactive</b>",
        success: "<b>success</b>",
        successfully: "<b>successfully</b>",
        Successful: "<b>Successful</b>",
        Failed: "<b>Failed</b>",
        Progressing: "<b>Progressing</b>",
      };
      str = str.replace(
        /\b(?:inactive|success|Successful|Failed|successfully|Progressing)\b/gi,
        (matched) => mapObj[matched]
      );
      
      // WHAT I WANT RETURNED USING TEMLATE LITERALS AND ${} TO INPUT JS EXPRESSION THAT HOLDS A VALUE.
      return `
          <div class="user">
            <p>${str}</p>
            <p>${stat.end_date}</p>
          </div>
        `;

    // .JOIN RETURNS ARRAY AS A NEW STRING
    }).join("");
    // console.log(html); LEFT HERE TO DISPLAY ARRAY IN CONSOLE.
    
    // GRABS HTML ELEMENT AND INSERTS IT, WHILE SECOND PARAMETER IS THE CONTENT ITSELF.
    document
      .querySelector(".status-column")
      .insertAdjacentHTML("beforeend", html);

    // CONSOLE.LOG SO I CAN SEE ARRAY IN CHROME CONSOLE.
    console.log(data.DATA);
    
    
    // Progress Column
    // function converter(bite, gb) {
    //   let b = parseInt(progress.processed, 10) / 1073741824;
    //   let g = parseInt(progress.total, 10) / 1073741824;

    //   console.log(b, g)

    //   return b / g;
    // }
    // converter("50", "2");

    const html2 = data.DATA.map((progress) => {
        /* HERE I AM TRYING TO TAKE THAT INITIAL STRING, TURN IT TO A NUMBER WITH
        PARSEINT, DIVIDE IT, AND TALLY BE THE RESULT. THE MATH.ROUND IS USED
        BECAUSE I WAS TRYING ROUND TO THE NEAREST TENTH */

        let bytes = parseInt(progress.processed, 10) / 1073741824;
            Math.round(bytes * 10) / 10;
        let total = parseInt(progress.total, 10) / 1073741824;
            Math.round(total * 10) / 10;
        let tally = bytes / total;
    
      return `
          <div class="user">
            <p>${tally}GB</p>
          </div>
        `;
    }).join("");
    // console.log(html2);
    document
      .querySelector(".progress-column")
      .insertAdjacentHTML("beforeend", html2);



    // User Column

    /* SAME THING PROCESS AS ABOVE. I WAS ABLE TO RENDER THE USER AND THEIR EMAIL AUTOMATICALLY
    POP UP WHEN THE LINK IS CLICKED */
    const html3 = data.DATA.map((user) => {
      return `
          <div class="user">  
            <a href="mailto:${user.email}">${user.fullname}</a>
          </div>
        `;
    }).join("");
    // console.log(html3);
    document
      .querySelector(".user-column")
      .insertAdjacentHTML("beforeend", html3);

    
    
      // Request Date Column
    const html4 = data.DATA.map((rdate) => {
      let nTime = new Date(rdate.request_date);
      // CONVERTS NTIME TO DATE OBJECT AS A STRING USING LOCAL TIME.
      nTime.toLocaleDateString;

      return `
            <div class="user">  
            <p>${nTime}</p>
            </div>
        `;
    }).join("");
    // console.log(html4);
    document
      .querySelector(".date-column")
      .insertAdjacentHTML("beforeend", html4);
  })
  //ANY ERRORS POP UP IN HERE. 
  .catch((error) => {
    console.log(error);
});





/* LEAVING THIS HERE BECAUSE IT WAS MY TRIAL AND ERRORS. 
   I KEPT GETTING "object-OBJECT" RENDERED ON THE SCREEN */


  
// async function loadIntoTable(url, table) {
//     const tableHead = table.querySelector("thead");
//     const tableBody = table.querySelector("tbody");
//     const response = await fetch(url);
//     const { DATA } = await response.json();

//     console.log(DATA)

//     // CLEAR THE TABLE
//     tableHead.innerHTML = "<tr></tr>";
//     tableBody.innerHTML = "";

//     // POPULATE HEADERS
//     // for (const infoText of DATA){
//     //     const infoElement = document.createElement('th');

//     //     infoElement.textContent = infoText;
//     //     tableHead.querySelector("tr").appendChild(infoElement);
//     // }

//     // POPULATE ROWS
//     for (const infoText of DATA) {
//       const infoElement = document.createElement("tr");

//       for (const cellText of DATA) {
//         const cellElement = document.createElement("td");

//         cellElement.textContent = JSON.stringify(cellText);
//         infoElement.appendChild(cellElement);
//       }

//       tableBody.appendChild(infoElement);
//     }
// }

// loadIntoTable("/public/test1.json", document.querySelector('table'));

// fetch("/public/test1.json")
//   .then(function (resp) {
//     return resp.json();
//   })
//   .then(function(data) {
//     // Status Column
//     const html = data.DATA.map(stat => {
//       return `
//          <p>${stat.status}</p>
//         `;
//     }).join("");
//     // console.log(html);
//     document.querySelector(".status").insertAdjacentHTML("beforeend", html);

//     // Progress Column
//     const html2 = data.DATA.map(progress => {
//         // let bytes = progress.processed / 1073741824
//         // let total = progress.total / 1073741824
//         return `
//             <p>${progress.bytes}GB / ${progress.total}GB</p>
//         `;
//     })
//     .join("");
//     // console.log(html2);
//     document.querySelector(".progress").insertAdjacentHTML("beforeend", html2);
//   });
