var express = require('express')
var router = express.Router()
const db = require('../connection')

router.post("/Triage", function(req, res) {
    let q = "INSERT INTO `Choice Foundation`.`Triage`\
    (`P_id`,\
    `GA_Appear`,\
    `GA_WOB`,\
    `GA_SC`,\
    `PA_Air`,\
    `PA_Air_Add`,\
    `PA_Breath`,\
    `PA_Eff`,\
    `PA_AirEntry`,\
    `PA_Ausc`,\
    `PA_SPO2_RA`,\
    `PA_SPO2_FIO2`,\
    `PA_ETCO2`,\
    `PA_Circ_HR`,\
    `PA_Circ_CFT`,\
    `PA_Circ_BP`,\
    `PA_Circ_CP`,\
    `PA_Circ_PP`,\
    `PA_Circ_ST`,\
    `PA_Circ_Rythm`,\
    `PA_Circ_T`,\
    `PA_Circ_Others`,\
    `PA_Dis_GCS`,\
    `PA_Dis_Pup`,\
    `PA_Dis_React`,\
    `PA_Dis_Motor`,\
    `PA_Dis_Blood`,\
    `PA_Exp_Temp`,\
    `PA_Exp_Color`,\
    `PA_Exp_SF`,\
    `PA_Exp_SF_Add`,\
    `IPC_Stable`,\
    `IPC_Unstable_Nlt`,\
    `IPC_Unstable_Lt`,\
    `FPC_Stable`,\
    `FPC_RD`,\
    `FPC_RF`,\
    `FPC_CS`,\
    `FPC_HS`,\
    `FPC_PB`,\
    `FPC_CF`,\
    `FPC_CA`,\
    `TC_Classification`,\
    `D_id`,\
    `Time`)\
    VALUES\
    (?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?);";
	db.query(q,[req.body.P_id,req.body.a,req.body.b,req.body.c,req.body.d,req.body.e,req.body.f,req.body.g, req.body.h, req.body.i, req.body.j, req.body.k, req.body.l, req.body.m, req.body.n, req.body.o, req.body.p, req.body.q, req.body.r, req.body.s, req.body.t, req.body.u, req.body.v, req.body.w, req.body.x, req.body.y, req.body.z, req.body.A,req.body.B,req.body.C,req.body.D,req.body.E,req.body.F,req.body.G, req.body.H, req.body.I, req.body.J, req.body.K, req.body.L, req.body.M, req.body.N, req.body.O, req.body.P, req.body.Q, req.body.R], (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
            console.log("Added a row");
        }
    });
});

router.post("/GCS", function(req, res) {
    let q = "INSERT INTO `Choice Foundation`.`GCS`\
    (`P_id`,\
    `Age`,\
    `EyeOpen`,\
    `Motor`,\
    `Verbal`,\
    `Score`,\
    `Severity`,\
    `D_id`,\
    `Time`)\
    VALUES\
    (?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?);";
	db.query(q,[req.body.P_id,req.body.a,req.body.b,req.body.c,req.body.d,req.body.e,req.body.f,req.body.g,req.body.h], (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
            console.log("Added a row");
        }
    });
});

router.post("/CRS", function(req, res) {
    let q = "INSERT INTO `Choice Foundation`.`CRS`\
    (`P_id`,\
    `RespRate`,\
    `Ausc`,\
    `AccessMuscle`,\
    `MentalStat`,\
    `SpO2_Room`,\
    `Color`,\
    `Score`,\
    `D_id`,\
    `Time`)\
    VALUES\
    (?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?);";
    db.query(q,[req.body.P_id,req.body.RespRate,req.body.Ausc,req.body.AccessMuscle, req.body.MentalStat, req.body.SPO2_room,req.body.Color,req.body.Score,req.body.D_id,req.body.Time], (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
            console.log("Added a row");
            res.json(result)
        }
    });
});

router.post("/PSofa", function(req, res) {
    let q = "INSERT INTO `Choice Foundation`.`PSofa`\
    (`P_id`,\
    `Resp_select`,\
    `Resp_Value`,\
    `PlatCount`,\
    `Bilirubin`,\
    `Card_AgeGrp`,\
    `Card_MAP`,\
    `Card_Vaso`,\
    `GCS`,\
    `Renal`,\
    `Score`,\
    `D_id`,\
    `Time`)\
    VALUES\
    (?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?);";
	db.query(q,[req.body.P_id,req.body.a,req.body.b,req.body.c,req.body.d,req.body.e,req.body.f,req.body.g, req.body.h, req.body.i, req.body.j, req.body.k, req.body.l], (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
            console.log("Added a row");
        }
    });
});


router.post("/Prism", function(req, res) {
    let q = "INSERT INTO `Choice Foundation`.`Prism`\
    (`P_id`,\
    `Card_HR`,\
    `Card_GCS`,\
    `Card_Temp`,\
    `Card_Pup`,\
    `Card_Score`,\
    `AB_AcidPH`,\
    `AB_AlkPH`,\
    `AB_PCO2`,\
    `AB_TCO2`,\
    `AB_PaO2`,\
    `AB_Score`,\
    `BT_PG`,\
    `BT_SP`,\
    `BT_SC`,\
    `BT_BUN`,\
    `BT_Score`,\
    `HT_WBC`,\
    `HT_PC`,\
    `HT_PTT`,\
    `HT_Score`,\
    `Score`,\
    `D_id`,\
    `Time`)\
    VALUES\
    (?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?);";
	db.query(q,[req.body.P_id,req.body.a,req.body.b,req.body.c,req.body.d,req.body.e,req.body.f,req.body.g, req.body.h, req.body.i, req.body.j, req.body.k, req.body.l, req.body.m, req.body.n, req.body.o, req.body.p, req.body.q, req.body.r, req.body.s, req.body.t, req.body.u, req.body.v, req.body.w], (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
            console.log("Added a row");
        }
    });
});


router.post("/OI", function(req, res) {
    let q = "INSERT INTO `Choice Foundation`.`OI`\
    (`P_id`,\
    `MAP`,\
    `FIO2`,\
    `PACO2`,\
    `PF`,\
    `PF_severity`,\
    `OI_score`,\
    `OI_severity`,\
    `D_id`,\
    `Time`)\
    VALUES\
    (?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?);";
	db.query(q,[req.body.P_id,req.body.a,req.body.b,req.body.c,req.body.d,req.body.e,req.body.f,req.body.g,req.body.h,req.body.i], (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
            console.log("Added a row");
        }
    });
});


router.post("/API", function(req, res) {
    let q = "INSERT INTO `Choice Foundation`.`API`\
    (`P_id`,\
    `Str_EFW`,\
    `Str_Sec_Parent`,\
    `Str_Sec_Physician`,\
    `Str_Sec_Wheez`,\
    `Str_Sec_Eos`,\
    `Str_Sec_Rhintis`,\
    `Min_wheez`,\
    `Min_PPDA`,\
    `Min_PDAD`,\
    `Min_Aero`,\
    `Min_WUC`,\
    `Min_EOS`,\
    `Min_milk`,\
    `D_id`,\
    `Time`)\
    VALUES\
    (?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?,\
    ?);";
	db.query(q,[req.body.P_id,req.body.a,req.body.b,req.body.c,req.body.d,req.body.e,req.body.f,req.body.g, req.body.h, req.body.i, req.body.j, req.body.k, req.body.l, req.body.m,req.body.n,req.body.o], (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
            console.log("Added a row");
        }
    });
});

module.exports = router;
