
// function makeJoinQuery({fromTable = {name = "", colName = ""}, toTable = {name = "", colName = ""}, joinType = "INNER"}) {
//   return `${joinType} JOIN ${fromTable.name} ON ${fromTable}.${fromTable.col} = ${toTable.name}.${colName}`
// }

// function createQuery(table, joinsArray = [], Where = "") {
//   return `SELECT * FROM ${table} ` +
//     joinsArray.map(makeJoinQuery(fromTable, toTable, joinType)).join("\n") + 
//     where ? where : "";
// }

// app.get("/getsongs", (req, res) => {
//   if (req.query.searchText) {
//     const joinArray = [
//       {fromTable: {name: "artists", colName: "artist_id"}, toTable: {name: "songs", colName: "artist_id"}},
//       {fromTable: {name: "artists", colName: "artist_id"}, toTable: {name: "songs", colName: "artist_id"}},
//     ];
//     let sql = createQuery("songs", joinArray);
//     let query = db.query(sql, (err, result) => {
//       if (err) {
//         res.status(500).send('not valid search')
//         throw err;
//       }
//       res.json(result);
//     });
//   } else {
//     let sql = `SELECT * 
//               FROM songs 
//               JOIN artists 
//               ON songs.artist_id = artists.artist_id
//               JOIN albums
//               ON albums.artist_id = artists.artist_id 
//                 `;
//     let query = db.query(sql, (err, result) => {
//       if (err) throw err;
//       res.json(result);
//     });
//   }
// });



// app.get('/getsongs', (req, res) => {
//   let sql = 'SELECT * FROM artists';
//   let query = db.query(sql, (err, result) => {
//       if(err) throw err;
//       console.log(result);
//       res.json(result)
//   })
// })

