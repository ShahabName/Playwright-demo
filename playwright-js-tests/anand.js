let stName="Anand";
let subject="Math";
let marks=0;
 
console.log("Welcome"+stName+" to "+subject+" class!");
 
marks=Math.floor(Math.random()*100)+1;
console.log("Original marks: "+ marks);
 
let bonusMarks =marks+5;
console.log("Marks with bonus: "+bonusMarks);
 
let diff=100-marks;
console.log("Diff :"+diff);
 
console.log("Marks == 50 : "+(marks == 50));
console.log("Marks === 50 : "+(marks === 50));
console.log("Marks between 50-100 : "+(marks > 50 && marks <= 100));
 
let school="CMS";
let stCount=551;
let isEnrolled=true;
let scholarship=null;
let subjects=["Math","English","Science"];
 
console.log(typeof school);
console.log(typeof stCount);
console.log(typeof isEnrolled);
console.log(typeof scholarship);
console.log(typeof subjects);
 
let grade;
 
if(marks>=90){
    grade='A';
}else if(marks>=75){
    grade='B';
}else if(marks>=60){
    grade='C';
}else{
    grade='Fail';
}
 
console.log("Grade: "+grade);
 