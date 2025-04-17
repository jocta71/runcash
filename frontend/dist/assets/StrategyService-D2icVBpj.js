console.log("Serviço de estratégias inicializado em modo offline");class i{async getStrategies(){try{return console.log("Chamada à API de estratégias desativada, retornando estratégia de sistema simulada"),[{_id:"system-strategy-default",name:"Estratégia Padrão do Sistema",description:"Estratégia padrão configurada para detecção de repetições e alternância de cores",isPublic:!0,isSystem:!0,userId:"system",rules:{detectRepetitions:!0,checkParity:!0,colorSequence:!0,detectDozens:!1,detectColumns:!1},terminalsConfig:{useDefaultTerminals:!0,customTerminals:[]},createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}]}catch(t){return console.error("Erro ao obter estratégias:",t),[]}}async getStrategy(t){try{console.log(`Chamada à API de estratégias desativada para ID ${t}`);const e=await this.getStrategies();return e.find(r=>r._id===t)||e[0]}catch(e){return console.error(`Erro ao obter estratégia ${t}:`,e),null}}async createStrategy(t){try{return console.log(`Chamada à API de estratégias desativada. Simulando criação de estratégia: ${t.name}`),{_id:`custom-${Date.now()}`,userId:"user",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),...t}}catch(e){return console.error("Erro ao criar estratégia:",e),null}}async updateStrategy(t,e){try{console.log(`Chamada à API de estratégias desativada. Simulando atualização da estratégia ${t}`);const a=await this.getStrategy(t);return a?{...a,...e,updatedAt:new Date().toISOString()}:null}catch(a){return console.error(`Erro ao atualizar estratégia ${t}:`,a),null}}async deleteStrategy(t){try{return console.log(`Chamada à API de estratégias desativada. Simulando exclusão da estratégia ${t}`),!0}catch(e){return console.error(`Erro ao excluir estratégia ${t}:`,e),!1}}async assignStrategy(t,e,a){try{console.log(`Chamada à API de estratégias desativada. Simulando associação da estratégia ${a} à roleta ${t}`);const r=await this.getStrategies(),s=r.find(o=>o._id===a)||r[0];return{_id:`rs-${t}-${a}`,userId:"system",roletaId:t,roletaNome:e,strategyId:s,active:!0,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}}catch(r){return console.error(`Erro ao associar estratégia ${a} à roleta ${t}:`,r),null}}async getRouletteStrategy(t){return console.log(`Chamada à API de estratégias desativada para roleta ${t}`),null}static async getSystemStrategy(){return console.log("[StrategyService] Obtendo estratégia do sistema simulada (modo offline)"),{_id:"system-strategy",name:"Estratégia do Sistema",description:"Estratégia padrão do sistema (modo offline)",isPublic:!0,isSystem:!0,userId:"system",rules:[{type:"repetition",value:2,active:!0},{type:"parity_alternation",value:3,active:!0},{type:"color_sequence",value:3,active:!0}],terminalsConfig:{useDefaultTerminals:!0,customTerminals:[0,1,2,3,4,5,6,7,8,9]},createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}}}const d=new i;export{d as S};
