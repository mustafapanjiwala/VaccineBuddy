
export const OnlyVaccineInfo = [
    {
        s_no: "3",
        age: ["6"],
        name: 'DTwP',
        gap: '6',
        fullForm: 'Diphtheria Tetanus Pertussis ( w= whole cell )',
        ageOfAdministration: 'Starts at 6 weeks',
        doses: '6wks, 10wks, 14wks, 1.5(1 & 1/2)yr, 5yr(can be replaced by DTaP)',
        noOFDoses: '4 if taking DTaP at 5yr',
        mode: 'IM',
        bodyPart: 'Thigh(Anterolateral Aspect)',
        fever: 'Yes',
        pain: 'Yes',
        disease: 'DTP vaccine can prevent diphtheria, tetanus, and pertussis.',
        effects: 'Besides pain and fever few children main develop seizures or abnormal behaviour, If so then these children to be administered DTaP for the next dose.',
        efficacy: '9/10',
        brands: ['Easy five', 'Pentavac', 'Combie 5', 'Quadravac', 'Easy four', 'Easy six'],
        compulsory: 'Yes',
        other: 'Mostly administered as combination vaccine with Hep B and HiB and /or IPV.',
        key: '1'
    },
    {
        name: 'Dtap',
        fullForm: ' Diphtheria Tetanus Pertussis ( a= acellular )',
        ageOfAdministration: 'Starts at 6 weeks',
        doses: '6wks, 10wks, 14wks, 1.5(1 & 1/2)yr, 5yr(can be replaced by DTaP)',
        noOFDoses: '4 if taking DTaP at 5yr',
        mode: 'IM',
        bodyPart: 'Thigh(Anterolateral Aspect)',
        fever: 'Yes',
        pain: 'Yes',
        disease: '',
        effects: 'Besides pain and fever few children main develop seizures or abnormal behaviour, If so then these children to be administered DTaP for the next dose.',
        efficacy: '9/10',
        brands: ['Infanrix Hexa', 'Pentaxim', 'Hexaxim', 'Infanrix'],
        compulsory: 'Yes',
        other: 'Not yet the no 1 recommended choice in India as DTwP ( whole cell Pertussis) is whats the choice at mass level.',
        key: '6'
    },
    {
        s_no: "24",
        age: ["48"],
        gap: "12",
        name: 'Hep A',
        fullForm: 'Hepatitis A Vaccine',
        ageOfAdministration: 'Starts at 12 months to 23 months. Unvaccinated older children and adults can also take the Vaccine.',
        doses: '12 months upto 23 months with 2nd dose six months after the first.',
        noOFDoses: '2(Maybe a single dose in a few brands)',
        mode: 'SC/IM',
        bodyPart: 'Depends on the brand',
        fever: 'No',
        pain: 'No',
        disease: 'polio',
        effects: 'Besides pain and fever few children main develop seizures or abnormal behaviour, If so then these children to be administered DTaP for the next dose.',
        efficacy: '9/10',
        brands: 'Bio vac A (wochhardt), Avaxim (sanofi), Havrix 720 (GSK) ',
        compulsory: 'Yes',
        other: 'Mostly administered as combination vaccine with Hep B and HiB and /or IPV.',
        key: '7'
    },
    {
        s_no: "6",
        age: ["6"],
        name: 'Hib',
        gap: '6',
        fullForm: 'H influenza B',
        ageOfAdministration: 'Recommended at 6 weeks, 10 weeks 14 weeks and 1 1/2 years ( booster ) ',
        doses: '6wks, 10wks, 14wks, 1.5(1 & 1/2)yr, 5yr(can be replaced by DTaP)',
        noOFDoses: '4',
        mode: 'IM',
        bodyPart: 'Thigh(Anterolateral Aspect)',
        fever: 'No',
        pain: 'No',
        disease: 'Hib is known to cause sever form of meningitis ',
        effects: 'Anaphylaxis maybe ',
        efficacy: '9/10',
        brands: ['Easy five', 'Pentavac', 'Combie 5', 'Quadravac', 'Easy four', 'Easy six', 'Hrexaxim', 'pentaxim'],
        compulsory: 'Yes',
        other: 'Not given these days as Individual vaccine',
        key: '8'
    },
    
    {
        s_no: "2",
        age: ["0"],
        name: 'HepB',
        gap: '0',
        fullForm: 'Hepatitis B',
        ageOfAdministration: 'Recommended at 6 weeks, 10 weeks 14 weeks and 1 1/2 years ( booster ) ',
        doses: '6wks, 10wks, 14wks',
        noOFDoses: '3',
        mode: 'IM',
        bodyPart: 'Thigh(Anterolateral Aspect)',
        fever: 'No',
        pain: 'No',
        disease: 'Hepatitis B is a virus which causes liver damage It is a permanent infection and eventually leads to liver failure and death ',
        effects: 'Anaphylaxis after previous dose, soreness, malaise',
        efficacy: '9/10',
        brands: ['Hep B (sii)'],
        compulsory: 'Yes',
        other: 'Mother to child transmission is preventable with timely Vaccination of child with vaccine along with hepatitis B immunoglobulin',
        key: '12'
    },
    
    {
        name: 'Cholera',
        fullForm: 'Cholera',
        ageOfAdministration: 'Recommended at birth, 10 weeks, 6 Months',
        doses: '6wks, 10wks, 14wks',
        noOFDoses: '3',
        mode: 'Oral vaccine ',
        bodyPart: 'Oral vaccine ',
        fever: 'No',
        pain: 'No',
        disease: 'Prevent s against Cholera,Causes severe watery diarrhea ',
        effects: 'None',
        efficacy: '9/10',
        brands: ['Bio Polio'],
        compulsory: 'Optional',
        other: 'Not routinely given',
        key: '15'
    },
    {
        s_no: "22",
        age: ["36"],
        name: 'MMR',
        gap: '12',
        fullForm: 'Measles Mumps and Rubella vaccine',
        ageOfAdministration: '9 months, 15 months, Booster dose at 5 years of age',
        doses: '6wks, 10wks, 14wks',
        noOFDoses: '3',
        mode: 'subcutaneous',
        bodyPart: 'front of arm, Also can be in the back of thigh',
        fever: 'No',
        pain: 'No',
        disease: 'Prevent s againstMeasles, Mumps, And rubella ',
        effects: 'None',
        efficacy: '9/10',
        brands: ['Tresivac (SII)'],
        compulsory: 'Optional',
        other: 'It is a live attenuated vaccine, Can be given in combination of choicken pox vaccine',
        key: '16'
    },

    {
        name: 'Rabies',
        fullForm: 'Rabies',
        ageOfAdministration: 'No fixed age',
        doses: 'GIVEN AFTER DOG BITE AND NOT ROUTINELY',
        noOFDoses: '5',
        mode: 'INTRAMUSCULAR',
        bodyPart: ': ANTEROLATERAL THIGH OLDER CHILDREN AND ADULTS CAN BE GIVEN IN THE DELTOID REGION',
        fever: 'No',
        pain: 'No',
        disease: 'RABIES IS A SLOW VIRUS DISEEASE SPREAD VIA DOG BITES (MOST COMMON) ',
        effects: 'None',
        efficacy: '9/10',
        brands: ['Tresivac (SII)', 'RABIVAX (SII)', 'CHIRORAB(BBIL)', 'BERAB(BE)', 'VAXIRAB(ZYDUS)', 'ABHAYRAB'],
        compulsory: 'OptiCOMPULSORY AFTEWR A DOG BITEonal',
        other: 'It is THE ONLY VACCINE WHICH GIVEN POST EXPOSURE',
        key: '18'
    },
    {
        s_no: "4",
        age: ["6"],
        name: 'IPV',
        gap: '6',
        fullForm: 'Inactivated polio vaccine',
        ageOfAdministration: '6 weeks ( 1 ½ months ), 10 weeks ( 2 ½ months ), 14 weeks ( 3 ½ months ), Booster dose at 1 ½ years of age (18months )',
        doses: 'If not taken / given then atleast one dose of IPV at 3 ½ months or 1 ½ years of age  ',
        noOFDoses: '4 ',
        mode: 'INTRAMUSCULAR',
        bodyPart: 'ANTEROLATERAL THIGH',
        fever: 'No',
        pain: 'No',
        disease: ' Polio, or poliomyelitis, is a crippling and potentially deadly disease. It is caused by the poliovirus. The virus spreads from person to person and can invade an infected person’s brain and spinal cord, causing paralysis (can’t move parts of the body).',
        effects: 'None',
        efficacy: '9/10',
        brands: ['Poliovac (SII)', 'Easy six (sanofi)', 'Pentaxim', 'Hexaxim', 'Infanrix hexa', 'Tetraxim'],
        compulsory: 'Yes',
        other: 'Its always better to take IPV over OPV as IPV is a inactivated vaccine where the virus is dead',
        key: '19'
    },
    
    {
        s_no: "37",
        age: ["480"],
        name: 'HPV',
        gap: '288',
        fullForm: 'Human Papilloma Virus',
        ageOfAdministration: '9 years to 14 years',
        doses: 'Currently recommended for all females upto 45 years of age',
        noOFDoses: '2 doses between 9 to 14 years, 6 months apart,In children above 14 years three doses to be given ',
        mode: 'INTRAMUSCULAR',
        bodyPart: ': ANTEROLATERAL THIGH',
        fever: 'No',
        pain: 'No',
        disease: 'Cervical cancer in women is the second most common after breast cancer, This is the only vaccine which has proven to prevent against cervical cancer in women',
        effects: 'None',
        efficacy: '9/10',
        brands: ['Gardasil', 'Cervarix (GSK)'],
        compulsory: 'Yes',
        other: 'Its always better to take IPV over OPV as IPV is a inactivated vaccine where the virus is dead',
        key: '23'
    },
    {
        name: 'MCV',
        fullForm: 'Meningococcal Conjugate Vaccine',
        ageOfAdministration: 'Above 2 years of age',
        doses: '4',
        noOFDoses: '4 dose',
        mode: 'INTRAMUSCULAR',
        bodyPart: ': ANTEROLATERAL THIGH',
        fever: 'No',
        pain: 'No',
        disease: 'Nisseria meningitidis is a bacteria that causes fulminant sepsis and severe meningitis in children.This vaccine prevents against that',
        effects: 'None',
        efficacy: '9/10',
        brands: ['Menectra', 'Menveo (GSK)'],
        compulsory: 'Yes',
        other: 'None',
        key: '24'
    },
    {
        s_no: "8",
        age: ["6"],
        name: 'PCV',
        gap: '6',
        fullForm: 'Pneumococcal Conjugate Vaccine (also commonly called pneumonia vaccine)',
        ageOfAdministration: '6 weeks, 8 weeks, 10 weeks, booster at 15 or 18 months of age.',
        doses: '',
        noOFDoses: '2 doses between 9 to 14 years, 6 months apart,In children above 14 years three doses to be given ',
        mode: 'INTRAMUSCULAR',
        bodyPart: 'ANTEROLATERAL THIGH',
        fever: 'No',
        pain: 'No',
        disease: 'Prevents against streptococcus pneumonia infections and pneumonia',
        effects: 'None',
        efficacy: '9/10',
        brands: ['Synflorix(GSK)', 'Prevenar 13(pfizer)', 'Pneumosil (sii)'],
        compulsory: 'Yes',
        other: 'None',
        key: '25'
    },
    
    {
        s_no: "26",
        age: ["60"],
        name: 'Varicella',
        gap: '12',
        fullForm: 'Chicken pox vaccine',
        ageOfAdministration: '15 months, booster at 5 yrs of age',
        doses: '2',
        noOFDoses: 'second dose can also be given six months after the first dose',
        mode: 'INTRAMUSCULAR',
        bodyPart: 'Front of arm(forearm), Can also be given in the back of thigh.',
        fever: 'No',
        pain: 'No',
        disease: 'Chicken pox is caused by varicella virus',
        effects: 'None',
        efficacy: '9/10',
        brands: ['Varilrix(GSK)', 'Variped(MSD)', 'Nexipox(novo)'],
        compulsory: 'Yes',
        other: 'None',
        key: '28'
    },
    
    {
        s_no: "7",
        age: ["6"],
        name: 'Rotavirus',
        gap: '6',
        fullForm: 'Rotavirus',
        ageOfAdministration: '6 wks, 10 wks, 14 wks.',
        doses: 'First dose to be give maximum by 16 wks, And last dose can be delayed upto max 32 wks',
        noOFDoses: '3',
        mode: 'ORAL',
        bodyPart: '',
        fever: 'No',
        pain: 'No',
        disease: 'Rotavirus vaccine is a vaccine used to protect against rotavirus infections, which are the leading cause of severe diarrhea among young children.',
        effects: 'None',
        efficacy: '9/10',
        brands: ['Rotasure', 'Rotavaq', 'RotaTeq', 'Rotasil'],
        compulsory: 'Yes',
        other: 'IT IS THE ONLY VACCINE WHICH GIVEN POST EXPOSURE ',
        key: '31'
    },
    
    {
        s_no: "0",
        age: ["0"],
        name: 'BCG',
        gap: '0',
        fullForm: 'Bacillus camellte Gurien vaccine',
        ageOfAdministration: 'Recommended at birth, Can be given upto 6 months of age',
        doses: '',
        noOFDoses: '1',
        mode: 'ID intradermal',
        bodyPart: 'left shoulder',
        fever: 'No',
        pain: 'No',
        disease: 'Tuberculosis, Very weak protection but India being an endemic country its mandatory to take the vaccine ',
        effects: 'Post Vaccination .. there is inflammation at the site of Vaccination which leave the characteristic scar after about three months',
        efficacy: '9/10',
        brands: ['BCG(sii)'],
        compulsory: 'Yes',
        other: 'none',
        key: '34'
    },
    {
        s_no: "1",
        age: ["0"],
        name: 'OPV',
        gap: '0',
        fullForm: 'Oral polio vaccine',
        ageOfAdministration: 'Recommended at birth, 10 weeks and 6 months',
        doses: '',
        noOFDoses: '3',
        mode: 'Oral vaccine',
        bodyPart: 'Oral route',
        fever: 'No',
        pain: 'No',
        disease: 'Polio is a debilitating disease caused by the poliomyelitis virus.',
        effects: 'May in rare situations lead to vaccine induced polio.',
        efficacy: '9/10',
        brands: ['Bio polio'],
        compulsory: 'compulsory only if not taken IPV',
        other: 'none',
        key: '35'
    },
    
    {
        s_no: "23",
        age: ["40"],
        name: 'TCV',
        gap: '12',
        fullForm: 'Typhoid conjugate vaccine',
        ageOfAdministration: 'Recommended at 6 months to 9 months of age',
        doses: 'Second dose maybe at 2 years age',
        noOFDoses: '1 dose(maybe 2 doses)',
        mode: 'IM intramuscular',
        bodyPart: 'anterolateral aspect of thigh',
        fever: 'No',
        pain: 'No',
        disease: 'Typhoid or enteric fever is caused by salmonella typhi. Conjugate vaccine has shown to provide good protection against this disease',
        effects: 'Anaphylaxis mat occur, occasionally fever',
        efficacy: '9/10',
        brands: ['Enteroshield', 'Typhbar TCV'],
        compulsory: 'yes',
        other: 'Though now there are claims of just one dose being enough .. still there are groups which believe that two doses are required for better Immunity',
        key: '39'
    },
    {
        s_no: "32",
        age: ["96"],
        name: 'Typhoid Booster',
        gap: '24',
        fullForm: 'Typhoid conjugate vaccine',
        ageOfAdministration: 'Recommended at 6 months to 9 months of age',
        doses: 'Second dose maybe at 2 years age',
        noOFDoses: '1 dose(maybe 2 doses)',
        mode: 'IM intramuscular',
        bodyPart: 'anterolateral aspect of thigh',
        fever: 'No',
        pain: 'No',
        disease: 'Typhoid or enteric fever is caused by salmonella typhi. Conjugate vaccine has shown to provide good protection against this disease',
        effects: 'Anaphylaxis mat occur, occasionally fever',
        efficacy: '9/10',
        brands: ['Enteroshield', 'Typhbar TCV'],
        compulsory: 'yes',
        other: 'Though now there are claims of just one dose being enough .. still there are groups which believe that two doses are required for better Immunity',
        key: '40'
    },
    {
        s_no: "36",
        age: ["480"],
        name: 'TDap',
        gap: '288',
        fullForm: 'Combined tetanus, diphtheria and acellular pertussis',
        ageOfAdministration: '11years-12 years of age.',
        doses: '',
        noOFDoses: '1 dose',
        mode: 'IM intramuscular',
        bodyPart: 'anterolateral aspect of thigh',
        fever: 'Yes',
        pain: 'Yes',
        disease: 'Tdap vaccine can prevent tetanus, diphtheria, and pertussis.',
        effects: 'Pain, redness, or swelling in the arm where the shot was given',
        efficacy: '9/10',
        brands: ['Boostrix(GSK)', 'ADACEL(Sanofi)'],
        compulsory: 'yes',
        other: 'Tdap is a booster immunization given at age 11 that offers continued protection from those diseases for adolescents and adults.',
        key: '41'
    },
    
]

export default {
    OnlyVaccineInfo,
}