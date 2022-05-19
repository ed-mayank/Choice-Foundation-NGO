var express = require('express')
var router = express.Router()
const db = require('../connection')


router.get("/database", function(req, res) {
	db.query("CREATE DATABASE Choice Foundation", (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("Database Created");
        }
    });
});

router.get("/triage", function(req, res) {
    let q ="CREATE TABLE `Choice Foundation`.`Triage` (\
        `Triage_id` INT NOT NULL AUTO_INCREMENT,\
        `P_id` VARCHAR(200) NOT NULL,\
        `GA_Appear` VARCHAR(200) NOT NULL,\
        `GA_WOB` VARCHAR(200) NOT NULL,\
        `GA_SC` VARCHAR(200) NOT NULL,\
        `PA_Air` VARCHAR(200) NOT NULL,\
        `PA_Air_Add` VARCHAR(200) NULL,\
        `PA_Breath` VARCHAR(200) NOT NULL,\
        `PA_Eff` VARCHAR(200) NOT NULL,\
        `PA_AirEntry` VARCHAR(200) NOT NULL,\
        `PA_Ausc` VARCHAR(200) NOT NULL,\
        `PA_SPO2_RA` VARCHAR(200) NOT NULL,\
        `PA_SPO2_FIO2` VARCHAR(200) NOT NULL,\
        `PA_ETCO2` VARCHAR(200) NOT NULL,\
        `PA_Circ_HR` VARCHAR(200) NOT NULL,\
        `PA_Circ_CFT` VARCHAR(200) NOT NULL,\
        `PA_Circ_BP` VARCHAR(200) NOT NULL,\
        `PA_Circ_CP` VARCHAR(200) NOT NULL,\
        `PA_Circ_PP` VARCHAR(200) NOT NULL,\
        `PA_Circ_ST` VARCHAR(200) NOT NULL,\
        `PA_Circ_Rythm` VARCHAR(200) NOT NULL,\
        `PA_Circ_T` VARCHAR(200) NOT NULL,\
        `PA_Circ_Others` VARCHAR(200) NULL,\
        `PA_Dis_GCS` VARCHAR(200) NOT NULL,\
        `PA_Dis_Pup` VARCHAR(200) NOT NULL,\
        `PA_Dis_React` VARCHAR(200) NOT NULL,\
        `PA_Dis_Motor` VARCHAR(200) NOT NULL,\
        `PA_Dis_Blood` VARCHAR(200) NOT NULL,\
        `PA_Exp_Temp` VARCHAR(200) NOT NULL,\
        `PA_Exp_Color` VARCHAR(200) NOT NULL,\
        `PA_Exp_SF` VARCHAR(200) NOT NULL,\
        `PA_Exp_SF_Add` VARCHAR(200) NULL,\
        `IPC_Stable` VARCHAR(200) NOT NULL,\
        `IPC_Unstable_Nlt` VARCHAR(200) NOT NULL,\
        `IPC_Unstable_Lt` VARCHAR(200) NOT NULL,\
        `FPC_Stable` VARCHAR(200) NOT NULL,\
        `FPC_RD` VARCHAR(200) NOT NULL,\
        `FPC_RF` VARCHAR(200) NOT NULL,\
        `FPC_CS` VARCHAR(200) NOT NULL,\
        `FPC_HS` VARCHAR(200) NOT NULL,\
        `FPC_PB` VARCHAR(200) NOT NULL,\
        `FPC_CF` VARCHAR(200) NOT NULL,\
        `FPC_CA` VARCHAR(200) NOT NULL,\
        `TC_Classification` VARCHAR(200) NOT NULL,\
        `D_id` VARCHAR(200),\
        `Time` VARCHAR(200),\
        PRIMARY KEY (`Triage_id`));";
	db.query(q, (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send("Triage Table Created");
        }
        console.log(result);
    });
});

router.get("/GCS", function(req, res) {
    let q ='CREATE TABLE `Choice Foundation`.`GCS` (\
        `GCS_id` INT NOT NULL AUTO_INCREMENT,\
        `P_id` VARCHAR(200) NOT NULL,\
        `Age` VARCHAR(200) NOT NULL,\
        `EyeOpen` VARCHAR(200) NOT NULL,\
        `Motor` VARCHAR(200) NOT NULL,\
        `Verbal` VARCHAR(200) NOT NULL,\
        `Score` VARCHAR(200) NOT NULL,\
        `Severity` VARCHAR(200) NULL,\
        `D_id` VARCHAR(200) NULL,\
        `Time` VARCHAR(200) NULL,\
        PRIMARY KEY (`GCS_id`));';
	db.query(q, (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send("GCS Table Created");
        }
        console.log(result);
    });
});

router.get("/CRS", function(req, res) {
    let q ='CREATE TABLE `Choice Foundation`.`CRS` (\
        `CRS_id` INT NOT NULL AUTO_INCREMENT,\
        `P_id` VARCHAR(200) NOT NULL,\
        `RespRate` VARCHAR(200) NOT NULL,\
        `Ausc` VARCHAR(200) NOT NULL,\
        `AccessMuscle` VARCHAR(200) NOT NULL,\
        `MentalStat` VARCHAR(200) NOT NULL,\
        `SpO2_Room` VARCHAR(200) NOT NULL,\
        `Color` VARCHAR(200) NOT NULL,\
        `Score` INT NULL,\
        `D_id` VARCHAR(200) NULL,\
        `Time` VARCHAR(200) NULL,\
        PRIMARY KEY (`CRS_id`));';
	db.query(q, (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send("CRS Table Created");
        }
        console.log(result);
    });
});

router.get("/PSofa", function(req, res) {
    let q ='CREATE TABLE `Choice Foundation`.`PSofa` (\
        `PSofa_id` INT NOT NULL AUTO_INCREMENT,\
        `P_id` VARCHAR(200) NOT NULL,\
        `Resp_select` VARCHAR(200) NOT NULL,\
        `Resp_Value` VARCHAR(200) NOT NULL,\
        `PlatCount` VARCHAR(200) NOT NULL,\
        `Bilirubin` VARCHAR(200) NOT NULL,\
        `Card_AgeGrp` VARCHAR(200) NULL,\
        `Card_MAP` VARCHAR(200) NULL,\
        `Card_Vaso` VARCHAR(200) NULL,\
        `GCS` VARCHAR(200) NOT NULL,\
        `Renal` VARCHAR(200) NOT NULL,\
        `Score` INT NULL,\
        `D_id` VARCHAR(200) NULL,\
        `Time` VARCHAR(200) NULL,\
        PRIMARY KEY (`PSofa_id`));';
	db.query(q, (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send("PSofa Table Created");
        }
        console.log(result);
    });
});

router.get("/Prism", function(req, res) {
    let q ='CREATE TABLE `Choice Foundation`.`Prism` (\
        `Prism_id` INT NOT NULL AUTO_INCREMENT,\
        `P_id` VARCHAR(200) NOT NULL,\
        `Card_HR` VARCHAR(200) NULL,\
        `Card_GCS` VARCHAR(200) NULL,\
        `Card_Temp` VARCHAR(200) NULL,\
        `Card_Pup` VARCHAR(200) NULL,\
        `Card_Score` INT NULL,\
        `AB_AcidPH` VARCHAR(200) NULL,\
        `AB_AlkPH` VARCHAR(200) NULL,\
        `AB_PCO2` VARCHAR(200) NULL,\
        `AB_TCO2` VARCHAR(200) NULL,\
        `AB_PaO2` VARCHAR(200) NULL,\
        `AB_Score` INT NULL,\
        `BT_PG` VARCHAR(200) NULL,\
        `BT_SP` VARCHAR(200) NULL,\
        `BT_SC` VARCHAR(200) NULL,\
        `BT_BUN` VARCHAR(200) NULL,\
        `BT_Score` INT NULL,\
        `HT_WBC` VARCHAR(200) NULL,\
        `HT_PC` VARCHAR(200) NULL,\
        `HT_PTT` VARCHAR(200) NULL,\
        `HT_Score` INT NULL,\
        `Score` INT NULL,\
        `D_id` VARCHAR(200) NULL,\
        `Time` VARCHAR(200) NULL,\
        PRIMARY KEY (`Prism_id`));';
	db.query(q, (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send("Prism Table Created");
        }
        console.log(result);
    });
});

router.get("/OI", function(req, res) {
    let q ='CREATE TABLE `Choice Foundation`.`OI` (\
        `OI_id` INT NOT NULL AUTO_INCREMENT,\
        `P_id` VARCHAR(200) NOT NULL,\
        `MAP` VARCHAR(200) NULL,\
        `FIO2` VARCHAR(200) NULL,\
        `PACO2` VARCHAR(200) NULL,\
        `PF` VARCHAR(200) NULL,\
        `PF_severity` VARCHAR(200) NULL,\
        `OI_score` VARCHAR(200) NULL,\
        `OI_severity` VARCHAR(200) NULL,\
        `D_id` VARCHAR(200) NULL,\
        `Time` VARCHAR(200) NULL,\
        PRIMARY KEY (`OI_id`));';
	db.query(q, (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send("OI Table Created");
        }
        console.log(result);
    });
});

router.get("/API", function(req, res) {
    let q ='CREATE TABLE `Choice Foundation`.`API` (\
        `API_id` INT NOT NULL AUTO_INCREMENT,\
        `P_id` VARCHAR(200) NOT NULL,\
        `Str_EFW` VARCHAR(200) NULL,\
        `Str_Sec_Parent` VARCHAR(200) NULL,\
        `Str_Sec_Physician` VARCHAR(200) NULL,\
        `Str_Sec_Wheez` VARCHAR(200) NULL,\
        `Str_Sec_Eos` VARCHAR(200) NULL,\
        `Str_Sec_Rhintis` VARCHAR(200) NULL,\
        `Min_wheez` VARCHAR(200) NULL,\
        `Min_PPDA` VARCHAR(200) NULL,\
        `Min_PDAD` VARCHAR(200) NULL,\
        `Min_Aero` VARCHAR(200) NULL,\
        `Min_WUC` VARCHAR(200) NULL,\
        `Min_EOS` VARCHAR(200) NULL,\
        `Min_milk` VARCHAR(200) NULL,\
        `D_id` VARCHAR(200) NULL,\
        `Time` VARCHAR(200) NULL,\
        PRIMARY KEY (`API_id`));';
	db.query(q, (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send("API Table Created");
        }
        console.log(result);
    });
});


module.exports = router;
