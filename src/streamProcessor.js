const fs = require("fs");

const fileOutputStream = fs.createWriteStream("./output.json");

let seperator = "";
const calculateBMIData = (personData) => {
  //Calculating and writing output in another file

  if(!seperator)
    fileOutputStream.write("[");

  const updatedPersonData = {...personData};

  const heightInMeter = updatedPersonData.HeightCm / 100;
  const bmi = (updatedPersonData.WeightKg / (heightInMeter * heightInMeter)).toFixed(2);

  let bmiCategory = "";
  let healthRisk = "";
  if(bmi <= 18.5) {
    bmiCategory = "Underweight"
    healthRisk = "Malnutrition risk"
  } else if (bmi > 18.5 && bmi <= 24.9) {
    bmiCategory = "Normal weight"
    healthRisk = "Low risk"
  } else if (bmi > 25 && bmi <= 29.9) {
    bmiCategory = "Overweight"
    healthRisk = "Enhanced risk"
  } else if (bmi > 30 && bmi <= 34.9) {
    bmiCategory = "Moderately obese"
    healthRisk = "Medium risk"
  } else if (bmi > 35 && bmi <= 39.9) {
    bmiCategory = "Severely obese"
    healthRisk = "High"
  } else if (bmi >= 40) {
    bmiCategory = "Very severely obese"
    healthRisk = "Very high risk"
  }

  updatedPersonData.bmi = bmi;
  updatedPersonData.bmiCategory = bmiCategory;
  updatedPersonData.healthRisk = healthRisk;

  fileOutputStream.write(seperator + JSON.stringify(updatedPersonData));

  if (!seperator)
    seperator = ",\n";
}

const end = () => {
  //Stream end handler

  fileOutputStream.write("]", () => {
    fileOutputStream.close()
  })
}

module.exports = {
  calculateBMIData,
  end
}