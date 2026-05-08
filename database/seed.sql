-- MediGuide AI Seed Data

-- ============================================================
-- DRUGS (50+ entries)
-- ============================================================
INSERT INTO drugs (name, category, description, uses, dosage, side_effects, ingredients, warnings) VALUES

('Paracetamol', 'Analgesic/Antipyretic',
 'A widely used over-the-counter pain reliever and fever reducer.',
 'Pain relief, fever reduction, headaches, muscle aches',
 'Adults: 500mg–1000mg every 4–6 hours. Max 4g/day.',
 'Nausea, rash (rare), liver damage (overdose)',
 'Acetaminophen (paracetamol)',
 'Do not exceed recommended dose. Avoid alcohol. Risk of serious liver damage with overdose.'),

('Ibuprofen', 'NSAID Anti-inflammatory',
 'A nonsteroidal anti-inflammatory drug (NSAID) used to reduce pain, fever, and inflammation.',
 'Pain, inflammation, fever, arthritis, menstrual cramps',
 'Adults: 200mg–400mg every 4–6 hours. Max 1200mg/day (OTC).',
 'Stomach upset, heartburn, nausea, dizziness, increased bleeding risk',
 'Ibuprofen',
 'Take with food. Avoid if history of stomach ulcers. May increase cardiovascular risk with long-term use.'),

('Amoxicillin', 'Antibiotic',
 'A penicillin-type antibiotic used to treat bacterial infections.',
 'Bacterial infections: ear, throat, lung, skin, urinary tract',
 'Adults: 250mg–500mg every 8 hours or 500mg–875mg every 12 hours.',
 'Diarrhea, nausea, skin rash, allergic reaction',
 'Amoxicillin trihydrate',
 'Complete the full course. Allergic to penicillin? Do not use. Seek emergency care for rash, swelling, or difficulty breathing.'),

('Aspirin', 'Analgesic/Antiplatelet',
 'Used for pain, fever, inflammation, and to prevent blood clots.',
 'Pain, fever, heart attack prevention, stroke prevention',
 'Pain: 325mg–650mg every 4 hours. Cardiac: 81mg daily.',
 'Stomach bleeding, nausea, tinnitus, allergic reactions',
 'Acetylsalicylic acid',
 'Do not give to children under 16 (Reye''s syndrome risk). Avoid with blood thinners.'),

('Metformin', 'Antidiabetic',
 'A first-line medication for type 2 diabetes that lowers blood glucose.',
 'Type 2 diabetes management, prediabetes, PCOS',
 'Initial: 500mg twice daily with meals. Max 2550mg/day.',
 'Nausea, diarrhea, stomach pain, lactic acidosis (rare)',
 'Metformin hydrochloride',
 'Not for type 1 diabetes. Monitor kidney function. Stop before contrast imaging procedures.'),

('Atorvastatin', 'Statin/Cholesterol-lowering',
 'A statin medication used to lower cholesterol and reduce cardiovascular risk.',
 'High cholesterol, heart disease prevention',
 '10mg–80mg once daily, usually at bedtime.',
 'Muscle pain, liver enzyme elevation, headache, nausea',
 'Atorvastatin calcium',
 'Report muscle pain immediately. Avoid grapefruit juice. Monitor liver function.'),

('Lisinopril', 'ACE Inhibitor',
 'An ACE inhibitor used to treat high blood pressure and heart failure.',
 'Hypertension, heart failure, post-heart attack recovery',
 '10mg–40mg once daily.',
 'Dry cough, dizziness, elevated potassium, angioedema (rare)',
 'Lisinopril dihydrate',
 'May cause dangerous drop in blood pressure. Do not use during pregnancy. Monitor potassium levels.'),

('Omeprazole', 'Proton Pump Inhibitor',
 'Reduces stomach acid production to treat GERD, ulcers, and heartburn.',
 'GERD, peptic ulcers, H. pylori (with antibiotics), heartburn',
 '20mg–40mg once daily before meals.',
 'Headache, diarrhea, nausea, vitamin B12 deficiency (long-term)',
 'Omeprazole',
 'Long-term use may reduce magnesium and B12. May mask symptoms of stomach cancer.'),

('Sertraline', 'SSRI Antidepressant',
 'A selective serotonin reuptake inhibitor for depression and anxiety disorders.',
 'Depression, OCD, PTSD, panic disorder, social anxiety',
 '50mg–200mg once daily.',
 'Nausea, insomnia, sexual dysfunction, drowsiness',
 'Sertraline hydrochloride',
 'May increase suicidal thoughts in young adults initially. Do not stop abruptly. Avoid MAOIs.'),

('Cetirizine', 'Antihistamine',
 'A second-generation antihistamine for allergy relief.',
 'Hay fever, hives, allergic rhinitis, itching',
 'Adults: 10mg once daily.',
 'Drowsiness, dry mouth, fatigue, headache',
 'Cetirizine hydrochloride',
 'Avoid driving if drowsy. Use caution with alcohol.'),

('Amlodipine', 'Calcium Channel Blocker',
 'A calcium channel blocker for high blood pressure and angina.',
 'Hypertension, angina (chest pain)',
 '5mg–10mg once daily.',
 'Swollen ankles, flushing, dizziness, headache',
 'Amlodipine besylate',
 'Do not stop abruptly. Avoid grapefruit juice.'),

('Metoprolol', 'Beta Blocker',
 'A beta-blocker for high blood pressure, heart failure, and angina.',
 'Hypertension, heart failure, angina, arrhythmia',
 '25mg–200mg daily (divided doses).',
 'Fatigue, dizziness, cold extremities, bradycardia',
 'Metoprolol succinate / tartrate',
 'Do not stop suddenly. May mask hypoglycemia in diabetics.'),

('Levothyroxine', 'Thyroid Hormone',
 'Synthetic thyroid hormone for hypothyroidism.',
 'Hypothyroidism, thyroid cancer treatment',
 'Individualized dose, typically 25–200mcg daily.',
 'Hair loss (initial), palpitations, weight loss, insomnia if overdosed',
 'Levothyroxine sodium',
 'Take on empty stomach. Many drug interactions. Monitor TSH levels.'),

('Warfarin', 'Anticoagulant',
 'A blood thinner that prevents blood clots.',
 'DVT, pulmonary embolism prevention, atrial fibrillation',
 'Individualized based on INR; typically 2–10mg daily.',
 'Bleeding, bruising, hair loss, skin necrosis (rare)',
 'Warfarin sodium',
 'Requires frequent INR monitoring. Many food and drug interactions. Avoid vitamin K-rich foods in large amounts.'),

('Albuterol', 'Bronchodilator',
 'A short-acting beta-agonist that opens airways in the lungs.',
 'Asthma, COPD, bronchospasm',
 '90mcg (1–2 puffs) every 4–6 hours as needed.',
 'Shakiness, rapid heartbeat, nervousness, headache',
 'Albuterol sulfate',
 'Do not use as primary treatment for long-term asthma control. Seek emergency care if no improvement.'),

('Fluoxetine', 'SSRI Antidepressant',
 'An antidepressant used for depression, OCD, bulimia, and panic disorder.',
 'Depression, OCD, bulimia nervosa, panic disorder',
 '20mg–80mg once daily.',
 'Nausea, insomnia, agitation, sexual dysfunction',
 'Fluoxetine hydrochloride',
 'Long half-life. Avoid MAOIs. May take 4–6 weeks to work.'),

('Prednisone', 'Corticosteroid',
 'A corticosteroid used to reduce inflammation and suppress the immune system.',
 'Allergic reactions, asthma, arthritis, lupus, cancer treatment',
 'Varies: 5mg–60mg daily depending on condition.',
 'Weight gain, mood changes, elevated blood sugar, osteoporosis (long-term)',
 'Prednisone',
 'Do not stop abruptly after long-term use. Increases infection risk. Monitor blood sugar.'),

('Metronidazole', 'Antibiotic/Antiprotozoal',
 'An antibiotic effective against anaerobic bacteria and certain parasites.',
 'Bacterial vaginosis, C. difficile, H. pylori, trichomoniasis',
 '250mg–500mg every 8 hours for 7–14 days.',
 'Metallic taste, nausea, headache, dark urine',
 'Metronidazole',
 'Avoid alcohol during and 48 hours after use. May interact with warfarin.'),

('Azithromycin', 'Macrolide Antibiotic',
 'A broad-spectrum antibiotic for respiratory and other infections.',
 'Pneumonia, bronchitis, STIs, skin infections',
 '500mg on day 1, then 250mg days 2–5.',
 'Nausea, diarrhea, abdominal pain, cardiac arrhythmia (rare)',
 'Azithromycin dihydrate',
 'May prolong QT interval. Use with caution in cardiac patients.'),

('Ciprofloxacin', 'Fluoroquinolone Antibiotic',
 'A broad-spectrum antibiotic for urinary tract and other infections.',
 'UTI, respiratory infections, anthrax (post-exposure)',
 '250mg–750mg every 12 hours.',
 'Tendon damage, nausea, diarrhea, photosensitivity, CNS effects',
 'Ciprofloxacin hydrochloride',
 'Risk of tendon rupture (especially Achilles). Avoid in children/growing adolescents. Avoid antacids.'),

('Losartan', 'ARB',
 'An angiotensin receptor blocker for high blood pressure.',
 'Hypertension, diabetic kidney disease, heart failure',
 '50mg–100mg once daily.',
 'Dizziness, elevated potassium, kidney impairment',
 'Losartan potassium',
 'Do not use during pregnancy. Monitor kidney function and potassium.'),

('Simvastatin', 'Statin',
 'A statin for lowering cholesterol.',
 'High cholesterol, cardiovascular disease prevention',
 '10mg–40mg once daily at bedtime.',
 'Muscle pain, liver damage (rare), headache',
 'Simvastatin',
 'Avoid grapefruit. Risk of rhabdomyolysis at high doses. Monitor liver enzymes.'),

('Pantoprazole', 'Proton Pump Inhibitor',
 'Reduces stomach acid; used for GERD and ulcers.',
 'GERD, gastric ulcers, Zollinger-Ellison syndrome',
 '40mg once daily before breakfast.',
 'Headache, diarrhea, nausea, joint pain',
 'Pantoprazole sodium',
 'Long-term use may cause magnesium deficiency. May mask gastric cancer.'),

('Tramadol', 'Opioid Analgesic',
 'A centrally acting opioid analgesic for moderate to severe pain.',
 'Moderate to severe pain',
 '50mg–100mg every 4–6 hours. Max 400mg/day.',
 'Nausea, dizziness, constipation, dependence, seizures',
 'Tramadol hydrochloride',
 'Risk of addiction. Avoid with MAOIs, SSRIs (serotonin syndrome). Controlled substance.'),

('Gabapentin', 'Anticonvulsant/Neuropathic',
 'Used for nerve pain and as adjunct therapy for seizures.',
 'Neuropathic pain, epilepsy, restless legs syndrome',
 '300mg–1200mg three times daily.',
 'Drowsiness, dizziness, peripheral edema, weight gain',
 'Gabapentin',
 'Do not stop abruptly. May cause suicidal thoughts. Respiratory depression risk with opioids.'),

('Furosemide', 'Loop Diuretic',
 'A powerful diuretic (water pill) for fluid retention and high blood pressure.',
 'Edema, heart failure, hypertension, kidney disease',
 '20mg–80mg once or twice daily.',
 'Dehydration, electrolyte imbalance, low blood pressure, hearing loss (high doses)',
 'Furosemide',
 'Monitor electrolytes. Risk of ototoxicity at high doses. Avoid NSAIDs.'),

('Clonazepam', 'Benzodiazepine',
 'A benzodiazepine for panic disorder and certain seizure types.',
 'Panic disorder, seizures, anxiety',
 '0.5mg–2mg twice or three times daily.',
 'Drowsiness, dizziness, memory impairment, dependence',
 'Clonazepam',
 'Risk of dependence and withdrawal. Do not stop abruptly. Avoid alcohol. Controlled substance.'),

('Hydrochlorothiazide', 'Thiazide Diuretic',
 'A thiazide diuretic for hypertension and edema.',
 'Hypertension, edema, kidney stones prevention',
 '12.5mg–50mg once daily.',
 'Low potassium, increased urination, photosensitivity, elevated blood sugar',
 'Hydrochlorothiazide',
 'Monitor electrolytes and blood sugar. Use sunscreen (photosensitivity).'),

('Escitalopram', 'SSRI Antidepressant',
 'An SSRI for major depression and generalized anxiety.',
 'Depression, generalized anxiety disorder',
 '10mg–20mg once daily.',
 'Nausea, insomnia, sexual dysfunction, headache',
 'Escitalopram oxalate',
 'Do not use with MAOIs. May prolong QT interval. Taper when stopping.'),

('Doxycycline', 'Tetracycline Antibiotic',
 'A broad-spectrum antibiotic for various infections.',
 'Acne, respiratory infections, malaria prevention, Lyme disease',
 '100mg twice daily.',
 'Photosensitivity, nausea, esophageal irritation, yeast infections',
 'Doxycycline hyclate / monohydrate',
 'Take with full glass of water. Avoid sun exposure. Not for children under 8 or during pregnancy.'),

('Methotrexate', 'Immunosuppressant/Chemotherapy',
 'Used for cancer, rheumatoid arthritis, and psoriasis.',
 'Rheumatoid arthritis, psoriasis, certain cancers',
 'Varies: 7.5mg–25mg weekly for arthritis.',
 'Nausea, mouth sores, liver toxicity, bone marrow suppression',
 'Methotrexate sodium',
 'Requires regular monitoring. Teratogenic - avoid pregnancy. Take folic acid to reduce side effects.'),

('Clopidogrel', 'Antiplatelet',
 'Prevents blood clots by stopping platelets from clumping.',
 'Heart attack and stroke prevention, coronary stent patients',
 '75mg once daily.',
 'Bleeding, bruising, gastrointestinal upset',
 'Clopidogrel bisulfate',
 'Serious bleeding risk. Avoid omeprazole (may reduce effectiveness). Inform surgeon before procedures.'),

('Ramipril', 'ACE Inhibitor',
 'Treats high blood pressure and reduces cardiovascular risk.',
 'Hypertension, heart failure, post-MI cardiovascular protection',
 '2.5mg–10mg once or twice daily.',
 'Dry cough, angioedema, low blood pressure, elevated potassium',
 'Ramipril',
 'Do not use during pregnancy. Monitor kidney function.'),

('Diazepam', 'Benzodiazepine',
 'A benzodiazepine used for anxiety, seizures, and muscle spasms.',
 'Anxiety, alcohol withdrawal, seizures, muscle spasms',
 '2mg–10mg two to four times daily.',
 'Drowsiness, confusion, memory impairment, dependence',
 'Diazepam',
 'High risk of dependence. Controlled substance. Do not use long-term. Avoid alcohol.'),

('Tamsulosin', 'Alpha Blocker',
 'Relaxes muscles in the prostate and bladder neck for easier urination.',
 'Benign prostatic hyperplasia (BPH)',
 '0.4mg once daily after a meal.',
 'Dizziness, retrograde ejaculation, orthostatic hypotension',
 'Tamsulosin hydrochloride',
 'Risk of "floppy iris syndrome" during eye surgery. Inform ophthalmologist before surgery.'),

('Finasteride', '5-Alpha Reductase Inhibitor',
 'Shrinks the prostate and is also used for male pattern baldness.',
 'Benign prostatic hyperplasia, male pattern baldness',
 'BPH: 5mg daily. Hair loss: 1mg daily.',
 'Sexual dysfunction, decreased libido, breast tenderness',
 'Finasteride',
 'Women should not handle crushed tablets (teratogenic). PSA levels may be falsely lowered.'),

('Bisoprolol', 'Beta Blocker',
 'A selective beta-1 blocker for heart failure and hypertension.',
 'Heart failure, hypertension, angina',
 '1.25mg–10mg once daily.',
 'Fatigue, bradycardia, cold extremities, dizziness',
 'Bisoprolol fumarate',
 'Do not stop abruptly. May worsen asthma.'),

('Levofloxacin', 'Fluoroquinolone Antibiotic',
 'A broad-spectrum antibiotic for respiratory and urinary infections.',
 'Pneumonia, sinusitis, UTI, skin infections',
 '250mg–750mg once daily.',
 'Nausea, diarrhea, tendon rupture, photosensitivity',
 'Levofloxacin',
 'Risk of tendon rupture. May prolong QT interval. Avoid in children.'),

('Cephalexin', 'Cephalosporin Antibiotic',
 'A first-generation cephalosporin antibiotic.',
 'Skin infections, UTI, respiratory infections, bone infections',
 '250mg–500mg every 6 hours.',
 'Diarrhea, nausea, allergic reaction, yeast infections',
 'Cephalexin monohydrate',
 'Use with caution if allergic to penicillin (cross-reactivity possible).'),

('Venlafaxine', 'SNRI Antidepressant',
 'A serotonin-norepinephrine reuptake inhibitor for depression and anxiety.',
 'Depression, generalized anxiety, panic disorder, social phobia',
 '37.5mg–225mg daily.',
 'Nausea, high blood pressure, sweating, sexual dysfunction',
 'Venlafaxine hydrochloride',
 'May raise blood pressure. Do not stop abruptly. Avoid MAOIs.'),

('Quetiapine', 'Atypical Antipsychotic',
 'An antipsychotic for schizophrenia, bipolar disorder, and depression.',
 'Schizophrenia, bipolar disorder, major depression (adjunct)',
 'Varies: 25mg–800mg daily.',
 'Drowsiness, weight gain, dry mouth, dizziness, metabolic changes',
 'Quetiapine fumarate',
 'May cause metabolic syndrome. Monitor blood glucose and weight. Avoid in elderly with dementia.'),

('Naloxone', 'Opioid Antagonist',
 'Rapidly reverses opioid overdose.',
 'Opioid overdose reversal (emergency use)',
 'IM/IV/intranasal: 0.4mg–2mg; repeat every 2–3 minutes if needed.',
 'Opioid withdrawal symptoms, rapid heart rate',
 'Naloxone hydrochloride',
 'Emergency use only. Call emergency services immediately even after using.'),

('Insulin Glargine', 'Insulin/Antidiabetic',
 'A long-acting insulin analog for diabetes management.',
 'Type 1 and Type 2 diabetes',
 'Individualized dosing once daily at the same time each day.',
 'Hypoglycemia, injection site reactions, weight gain',
 'Insulin glargine',
 'Monitor blood glucose regularly. Store properly (refrigerate). Never share needles.'),

('Enalapril', 'ACE Inhibitor',
 'An ACE inhibitor for hypertension and heart failure.',
 'Hypertension, heart failure, asymptomatic left ventricular dysfunction',
 '5mg–40mg daily (single or divided).',
 'Dry cough, dizziness, angioedema, elevated potassium',
 'Enalapril maleate',
 'Do not use during pregnancy. Monitor kidney function and potassium.'),

('Zolpidem', 'Sedative-Hypnotic',
 'A short-term treatment for insomnia.',
 'Insomnia (short-term)',
 '5mg–10mg immediately before bedtime.',
 'Drowsiness, dizziness, sleepwalking, memory issues',
 'Zolpidem tartrate',
 'Controlled substance. Only use when able to get 7–8 hours sleep. Risk of dependence. Avoid alcohol.'),

('Allopurinol', 'Xanthine Oxidase Inhibitor',
 'Reduces uric acid production to prevent gout attacks.',
 'Gout, hyperuricemia, kidney stones (uric acid type)',
 '100mg–300mg once daily.',
 'Skin rash (including serious Stevens-Johnson syndrome), nausea, kidney impairment',
 'Allopurinol',
 'Stop immediately if rash develops. Increase fluid intake. Titrate dose slowly.'),

('Montelukast', 'Leukotriene Receptor Antagonist',
 'Prevents asthma attacks and relieves allergy symptoms.',
 'Asthma prevention, allergic rhinitis',
 'Adults: 10mg once daily in the evening.',
 'Headache, neuropsychiatric effects (depression, suicidal thoughts rare)',
 'Montelukast sodium',
 'FDA warning: neuropsychiatric events. Not for acute asthma attacks.'),

('Spironolactone', 'Aldosterone Antagonist',
 'A potassium-sparing diuretic used for heart failure and hormonal conditions.',
 'Heart failure, hypertension, hyperaldosteronism, PCOS, acne',
 '25mg–200mg daily.',
 'Elevated potassium, gynecomastia, irregular periods',
 'Spironolactone',
 'Monitor potassium. Avoid potassium supplements. Do not use during pregnancy.'),

('Topiramate', 'Anticonvulsant',
 'Used for epilepsy and migraine prevention.',
 'Epilepsy, migraine prevention, bipolar disorder (off-label)',
 '25mg–400mg daily.',
 'Cognitive impairment ("word-finding"), weight loss, kidney stones, paresthesia',
 'Topiramate',
 'Stay hydrated (kidney stone risk). May impair cognitive function. Use birth control.'),

('Duloxetine', 'SNRI Antidepressant',
 'An SNRI for depression, anxiety, and neuropathic pain.',
 'Depression, GAD, neuropathic pain, fibromyalgia',
 '30mg–120mg daily.',
 'Nausea, dry mouth, dizziness, elevated blood pressure',
 'Duloxetine hydrochloride',
 'Avoid abrupt discontinuation. Do not use with MAOIs.'),

('Prednisolone', 'Corticosteroid',
 'A corticosteroid for inflammatory and allergic conditions.',
 'Asthma, arthritis, allergic conditions, immune disorders',
 'Varies by condition: 5mg–60mg daily.',
 'Weight gain, mood changes, elevated blood sugar, bone thinning',
 'Prednisolone',
 'Do not stop abruptly after prolonged use. Monitor bone density with long-term use.'),

('Codeine', 'Opioid Analgesic',
 'An opioid analgesic and cough suppressant.',
 'Mild to moderate pain, dry cough',
 '15mg–60mg every 4–6 hours. Max 240mg/day.',
 'Constipation, drowsiness, nausea, dependence',
 'Codeine phosphate',
 'Controlled substance. Risk of dependence. Avoid in ultra-rapid metabolizers. Not for children under 12.');

-- ============================================================
-- SUPPLEMENTS
-- ============================================================
INSERT INTO supplements (name, benefits, ingredients, warnings, dosage) VALUES

('Vitamin D3',
 'Supports bone health, immune function, mood regulation, and calcium absorption.',
 'Cholecalciferol (Vitamin D3)',
 'Toxicity possible at very high doses. May interact with some medications.',
 '600–2000 IU daily (general adults); up to 4000 IU with medical supervision.'),

('Omega-3 Fish Oil',
 'Supports heart health, reduces triglycerides, anti-inflammatory, brain health.',
 'EPA (eicosapentaenoic acid), DHA (docosahexaenoic acid)',
 'May increase bleeding risk. Avoid before surgery. May interact with blood thinners.',
 '1000mg–3000mg daily with meals.'),

('Magnesium Glycinate',
 'Supports muscle and nerve function, sleep quality, and stress reduction.',
 'Magnesium glycinate chelate',
 'High doses may cause diarrhea. Interactions with antibiotics and diuretics.',
 '200mg–400mg daily.'),

('Vitamin C',
 'Antioxidant, immune support, collagen synthesis, iron absorption.',
 'Ascorbic acid',
 'High doses may cause kidney stones and GI upset.',
 '500mg–1000mg daily.'),

('Zinc',
 'Immune function, wound healing, DNA synthesis, taste and smell.',
 'Zinc gluconate / zinc picolinate',
 'Excess zinc may impair copper absorption. Nausea on empty stomach.',
 '8mg–40mg daily.'),

('Probiotics',
 'Gut health, immune support, IBS symptom relief.',
 'Lactobacillus acidophilus, Bifidobacterium, various strains',
 'May cause gas or bloating initially. Use with caution in immunocompromised individuals.',
 '1–10 billion CFU daily.'),

('Melatonin',
 'Sleep regulation, jet lag, circadian rhythm support.',
 'Melatonin',
 'May cause grogginess. Avoid driving after use. Long-term effects not fully established.',
 '0.5mg–5mg 30 minutes before sleep.');

-- ============================================================
-- INTERACTIONS
-- ============================================================
INSERT INTO interactions (drug1_id, drug2_id, severity, description)
SELECT d1.id, d2.id, 'severe',
  'Combining warfarin and aspirin significantly increases risk of serious bleeding complications.'
FROM drugs d1, drugs d2 WHERE d1.name = 'Warfarin' AND d2.name = 'Aspirin';

INSERT INTO interactions (drug1_id, drug2_id, severity, description)
SELECT d1.id, d2.id, 'severe',
  'Sertraline and tramadol together can cause serotonin syndrome, a potentially life-threatening condition.'
FROM drugs d1, drugs d2 WHERE d1.name = 'Sertraline' AND d2.name = 'Tramadol';

INSERT INTO interactions (drug1_id, drug2_id, severity, description)
SELECT d1.id, d2.id, 'moderate',
  'Ibuprofen can reduce the blood pressure-lowering effect of lisinopril and increase kidney risk.'
FROM drugs d1, drugs d2 WHERE d1.name = 'Ibuprofen' AND d2.name = 'Lisinopril';

INSERT INTO interactions (drug1_id, drug2_id, severity, description)
SELECT d1.id, d2.id, 'moderate',
  'Ciprofloxacin can increase warfarin levels, raising the risk of bleeding.'
FROM drugs d1, drugs d2 WHERE d1.name = 'Ciprofloxacin' AND d2.name = 'Warfarin';

INSERT INTO interactions (drug1_id, drug2_id, severity, description)
SELECT d1.id, d2.id, 'moderate',
  'Metformin combined with furosemide may increase the risk of lactic acidosis.'
FROM drugs d1, drugs d2 WHERE d1.name = 'Metformin' AND d2.name = 'Furosemide';

INSERT INTO interactions (drug1_id, drug2_id, severity, description)
SELECT d1.id, d2.id, 'severe',
  'Clonazepam and alcohol together cause dangerous CNS depression and respiratory suppression.'
FROM drugs d1, drugs d2 WHERE d1.name = 'Clonazepam' AND d2.name = 'Tramadol';

INSERT INTO interactions (drug1_id, drug2_id, severity, description)
SELECT d1.id, d2.id, 'mild',
  'Metoprolol and atorvastatin: minor interaction; both may increase each other''s blood levels slightly.'
FROM drugs d1, drugs d2 WHERE d1.name = 'Metoprolol' AND d2.name = 'Atorvastatin';

INSERT INTO interactions (drug1_id, drug2_id, severity, description)
SELECT d1.id, d2.id, 'moderate',
  'Fluoxetine inhibits metabolism of codeine, potentially increasing its effects and side effects.'
FROM drugs d1, drugs d2 WHERE d1.name = 'Fluoxetine' AND d2.name = 'Codeine';

INSERT INTO interactions (drug1_id, drug2_id, severity, description)
SELECT d1.id, d2.id, 'mild',
  'Omeprazole may slightly reduce the absorption of levothyroxine when taken simultaneously.'
FROM drugs d1, drugs d2 WHERE d1.name = 'Omeprazole' AND d2.name = 'Levothyroxine';

INSERT INTO interactions (drug1_id, drug2_id, severity, description)
SELECT d1.id, d2.id, 'severe',
  'Methotrexate and ibuprofen together can cause severe methotrexate toxicity including bone marrow suppression.'
FROM drugs d1, drugs d2 WHERE d1.name = 'Methotrexate' AND d2.name = 'Ibuprofen';
