/* Agri360 shared farmer storage (localStorage only — no backend/database) */

const AGRI360_FARMERS_KEY = 'agri360_farmers';
const AGRI360_DEFAULT_LOCATION = 'Ambod, Mansa, Gandhinagar, Gujarat';

function agri360GetFarmers(){
  try{ return JSON.parse(localStorage.getItem(AGRI360_FARMERS_KEY)) || []; }
  catch(e){ return []; }
}

function agri360SaveFarmers(farmers){
  localStorage.setItem(AGRI360_FARMERS_KEY, JSON.stringify(farmers));
}

function agri360GetFarmerByCode(code){
  if(!code) return null;
  return agri360GetFarmers().find(f => f.code === code) || null;
}

function agri360GetFarmerByMitra(mitraCardNumber){
  if(!mitraCardNumber) return null;
  return agri360GetFarmers().find(f => f.mitraCardNumber === mitraCardNumber) || null;
}

function agri360GenerateFarmerCode(){
  const farmers = agri360GetFarmers();
  let max = 0;
  farmers.forEach(f => {
    const m = /^AGF-(\d+)$/.exec(f.code || '');
    if(m) max = Math.max(max, parseInt(m[1], 10));
  });
  return 'AGF-' + String(max + 1).padStart(4, '0');
}

function agri360GenerateFarmId(){
  const year = new Date().getFullYear();
  const farmers = agri360GetFarmers();
  let max = 0;
  const re = new RegExp('^FM-' + year + '-(\\d+)$');
  farmers.forEach(f => {
    const m = re.exec(f.farmId || '');
    if(m) max = Math.max(max, parseInt(m[1], 10));
  });
  return `FM-${year}-${String(max + 1).padStart(5, '0')}`;
}

function agri360AddFarmer(farmer){
  const farmers = agri360GetFarmers();
  farmers.push(farmer);
  agri360SaveFarmers(farmers);
  return farmer;
}

function agri360DeleteFarmer(code){
  agri360SaveFarmers(agri360GetFarmers().filter(f => f.code !== code));
}
