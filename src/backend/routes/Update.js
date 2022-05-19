// var express = require('express')
// var router = express.Router()
// const db = require('../connection')

// router.get("/Master/:id", function(req, res) {
//     let q = `INSERT INTO `Choice Foundation`.`Master`
//     (`Entry_id`,
//     `P_id`,
//     `D_id`,
//     `Triage_Count`,
//     `Triage_LastUse`,
//     `GCS_Count`,
//     `GCS_LastUse`,
//     `CRS_Count`,
//     `CRS_LastUse`,
//     `PSofa_Count`,
//     `PSofa_LastUse`,
//     `Prism_Count`,
//     `Prism_LastUse`,
//     `OI_Count`,
//     `OI_LastUse`,
//     `API_Count`,
//     `API_LastUse`)
//     VALUES
//     (<{Entry_id: }>,
//     <{P_id: }>,
//     <{D_id: }>,
//     <{Triage_Count: }>,
//     <{Triage_LastUse: Not done}>,
//     <{GCS_Count: }>,
//     <{GCS_LastUse: Not done}>,
//     <{CRS_Count: }>,
//     <{CRS_LastUse: Not done}>,
//     <{PSofa_Count: }>,
//     <{PSofa_LastUse: Not done}>,
//     <{Prism_Count: }>,
//     <{Prism_LastUse: Not done}>,
//     <{OI_Count: }>,
//     <{OI_LastUse: Not Done}>,
//     <{API_Count: }>,
//     <{API_LastUse: Not Done}>);`;
	
//     db.query(q, req, (err,result)=>{
//         if(err){
//             console.log(err);
//         }
//         else{
//             res.send("Table Updated")
//             res.json(result)
//         }
//     });
// });
// module.exports = router;