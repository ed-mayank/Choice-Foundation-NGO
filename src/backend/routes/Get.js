var express = require('express')
var router = express.Router()
const db = require('../connection')

router.get("/Triage/:id", function(req, res) {
    let q = "SELECT * FROM `Choice Foundation`.Triage WHERE P_id = ? order by Triage_id DESC LIMIT 1;";
	
    db.query(q,req.params.id, (err,rows,fields)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json(rows)
        }
    });
});

router.get("/GCS/:id", function(req, res) {
    let q = "SELECT * FROM `Choice Foundation`.GCS WHERE P_id = ? order by GCS_id DESC LIMIT 1;";
	
    db.query(q,req.params.id, (err,rows,fields)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(rows)
        }
    });
});



router.get("/CRS/:id", function(req, res) {
    let q = "SELECT * FROM `Choice Foundation`.CRS WHERE P_id = ? order by CRS_id DESC LIMIT 1;";
	
    db.query(q,req.params.id, (err,rows,fields)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(rows)
        }
    });
});

router.get("/PSofa/:id", function(req, res) {
    let q = "SELECT * FROM `Choice Foundation`.PSofa WHERE P_id = ? order by PSofa_id DESC LIMIT 1;";
	
    db.query(q,req.params.id, (err,rows,fields)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json(rows)
        }
    });
});

router.get("/Prism/:id", function(req, res) {
    let q = "SELECT * FROM `Choice Foundation`.Prism WHERE P_id = ? order by Prism_id DESC LIMIT 1;";
	
    db.query(q,req.params.id, (err,rows,fields)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json(rows)
        }
    });
});

router.get("/OI/:id", function(req, res) {
    let q = "SELECT * FROM `Choice Foundation`.OI WHERE P_id = ? order by OI_id DESC LIMIT 1;";
	
    db.query(q,req.params.id, (err,rows,fields)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json(rows)
        }
    });
});

router.get("/API/:id", function(req, res) {
    let q = "SELECT * FROM `Choice Foundation`.API WHERE P_id = ? order by API_id DESC LIMIT 1;";
	
    db.query(q,req.params.id, (err,rows,fields)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json(rows)
        }
    });
});


router.get("/GCS", function(req, res) {
    let q = "SELECT * FROM `Choice Foundation`.GCS;";
	
    db.query(q,req.params.id, (err,rows,fields)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(rows)
        }
    });
});

router.get("/CRS", function(req, res) {
    let q = "SELECT * FROM `Choice Foundation`.CRS;";
	
    db.query(q,req.params.id, (err,rows,fields)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(rows)
        }
    });
});

router.get("/Triage", function(req, res) {
    let q = "SELECT * FROM `Choice Foundation`.Triage;";
	
    db.query(q,req.params.id, (err,rows,fields)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(rows)
        }
    });
});

router.get("/Prism", function(req, res) {
    let q = "SELECT * FROM `Choice Foundation`.Prism;";
	
    db.query(q,req.params.id, (err,rows,fields)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(rows)
        }
    });
});

router.get("/PSofa", function(req, res) {
    let q = "SELECT * FROM `Choice Foundation`.PSofa;";
	
    db.query(q,req.params.id, (err,rows,fields)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(rows)
        }
    });
});

router.get("/OI", function(req, res) {
    let q = "SELECT * FROM `Choice Foundation`.OI;";
	
    db.query(q,req.params.id, (err,rows,fields)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(rows)
        }
    });
});

router.get("/API", function(req, res) {
    let q = "SELECT * FROM `Choice Foundation`.API;";
	
    db.query(q,req.params.id, (err,rows,fields)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(rows)
        }
    });
});

router.get("/GCSReq", function(req, res) {
    let q = "SELECT MAX(GCS_id) AS id FROM `Choice Foundation`.GCS GROUP BY P_id;";
	
    db.query(q,(err,rows,fields)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(rows)
        }
    });
});

router.get("/CRSReq", function(req, res) {
    let q = "SELECT MAX(CRS_id) AS id FROM `Choice Foundation`.CRS GROUP BY P_id;";
	
    db.query(q,(err,rows,fields)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(rows)
        }
    });
});

router.get("/PrismReq", function(req, res) {
    let q = "SELECT MAX(Prism_id) AS id FROM `Choice Foundation`.Prism GROUP BY P_id;";
	
    db.query(q,(err,rows,fields)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(rows)
        }
    });
});

router.get("/PSofaReq", function(req, res) {
    let q = "SELECT MAX(PSofa_id) AS id FROM `Choice Foundation`.PSofa GROUP BY P_id;";
	
    db.query(q,(err,rows,fields)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(rows)
        }
    });
});

router.get("/OIReq", function(req, res) {
    let q = "SELECT MAX(OI_id) AS id FROM `Choice Foundation`.OI GROUP BY P_id;";
	
    db.query(q,(err,rows,fields)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(rows)
        }
    });
});


router.get("/APIReq", function(req, res) {
    let q = "SELECT MAX(API_id) AS id FROM `Choice Foundation`.API GROUP BY P_id;";
	
    db.query(q,(err,rows,fields)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(rows)
        }
    });
});
module.exports = router;