/**
 * ELOÁ 4 ANOS — Backend de confirmação de presença
 * Baseado na arquitetura "master" usada no projeto da Carmem.
 *
 * COMO USAR:
 * 1. Crie uma Planilha Google nova.
 * 2. Na primeira aba (pode renomear para "Convidados"), crie o cabeçalho na linha 1:
 *    Nome | Adultos | Criancas | Telefone | Status | DataConfirmacao
 * 3. Preencha a lista de convidados nas linhas seguintes (Nome, Adultos e Criancas).
 *    Deixe Telefone, Status e DataConfirmacao em branco.
 * 4. Extensões > Apps Script, cole este código.
 * 5. Implantar > Nova implantação > Tipo "App da Web".
 *    - Executar como: Eu
 *    - Quem pode acessar: Qualquer pessoa
 * 6. Copie a URL gerada e cole em GAS_URL nos arquivos confirmar.html e admin.html.
 */

const SHEET_NAME = "Convidados"; // nome da aba na planilha

function getSheet(){
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
}

function doGet(e){
  const action = e.parameter.action;

  if(action === "list"){
    return jsonResponse({ guests: listGuests() });
  }

  return jsonResponse({ error: "ação inválida" });
}

function doPost(e){
  let body;
  try{
    body = JSON.parse(e.postData.contents);
  }catch(err){
    return jsonResponse({ error: "payload inválido" });
  }

  if(body.action === "confirm"){
    const ok = confirmGuest(body.nome, body.telefone);
    return jsonResponse({ success: ok });
  }

  if(body.action === "decline"){
    const ok = declineGuest(body.nome);
    return jsonResponse({ success: ok });
  }

  return jsonResponse({ error: "ação inválida" });
}

function listGuests(){
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  const guests = [];

  for(let i = 1; i < data.length; i++){
    const row = data[i];
    if(!row[0]) continue; // pula linhas sem nome
    guests.push({
      nome: row[0],
      adultos: row[1] || 1,
      criancas: row[2] || 0,
      telefone: row[3] || "",
      status: row[4] || "Pendente"
    });
  }
  return guests;
}

function confirmGuest(nome, telefone){
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();

  for(let i = 1; i < data.length; i++){
    if(normalize(data[i][0]) === normalize(nome)){
      const row = i + 1; // linha real na planilha (1-indexed + header)
      sheet.getRange(row, 4).setValue(telefone || "");        // Telefone
      sheet.getRange(row, 5).setValue("Confirmado");          // Status
      sheet.getRange(row, 6).setValue(new Date());            // DataConfirmacao
      return true;
    }
  }
  return false; // nome não encontrado na lista
}

function declineGuest(nome){
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();

  for(let i = 1; i < data.length; i++){
    if(normalize(data[i][0]) === normalize(nome)){
      const row = i + 1;
      sheet.getRange(row, 5).setValue("Recusado");        // Status
      sheet.getRange(row, 6).setValue(new Date());          // DataConfirmacao
      return true;
    }
  }
  return false;
}

function normalize(str){
  return (str || "").toString()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().trim();
}

function jsonResponse(obj){
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
