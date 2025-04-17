import{j as s,a5 as o,aL as j,aM as u,aN as N,aO as p,aP as f,al as g,aQ as v,ah as b,ag as y,aR as k,z,aS as F,aT as w,aU as A,aV as C,y as S}from"./ui-TF4rhkS0.js";import{r as d,d as P,L as E}from"./vendor-CYNtys_G.js";const G=({isOpen:r=!1,onClose:n,isMobile:a=!1})=>{const[L,T]=d.useState(!1),[l,m]=d.useState("account-information"),i=P(),x=[{id:"account-information",label:"Conta",icon:b},{id:"billing",label:"Pagamentos",icon:y},{id:"plans",label:"Planos",icon:k}],h=e=>{m(e),e==="account-information"?i("/profile"):e==="billing"?i("/billing"):e==="plans"&&i("/planos")},t=a?"h-full w-full mobile-sidebar-inner animate-slide-right":"h-screen fixed top-0 left-0 w-64 hidden md:flex flex-col animate-slide-right z-40 bg-[#0B0A0F] border-r border-[#33333359]",c=s.jsxs("div",{className:"p-3 flex flex-col h-full justify-between",children:[s.jsx("div",{className:"flex justify-center items-center py-4 mb-2",children:s.jsx(E,{to:"/",className:"flex items-center justify-center",children:s.jsx("span",{className:"font-bold text-xl text-primary",children:"RunCash"})})}),a&&s.jsx("div",{className:"flex justify-end mb-4",children:s.jsx("button",{onClick:n,className:"p-1 rounded-md text-gray-400 hover:text-white",children:s.jsx(o,{size:24})})}),s.jsxs("div",{className:"space-y-6",children:[s.jsxs("div",{children:[s.jsx("h3",{className:"text-gray-500 text-xs font-medium px-4 mb-2",children:"Jogos"}),s.jsxs("div",{className:"space-y-1",children:[s.jsxs("div",{className:"menu-item active",children:[s.jsx("div",{className:"bg-[#1A191F] p-1.5 rounded-md flex-shrink-0",children:s.jsx(j,{size:18,className:"text-white"})}),s.jsx("span",{className:"truncate",children:"Slots"})]}),s.jsxs("div",{className:"menu-item",children:[s.jsx("div",{className:"bg-[#1A191F] p-1.5 rounded-md flex-shrink-0",children:s.jsx(u,{size:18,className:"text-white"})}),s.jsx("span",{className:"truncate",children:"Cassino Ao Vivo"})]}),s.jsxs("div",{className:"menu-item",children:[s.jsx("div",{className:"bg-[#1A191F] p-1.5 rounded-md flex-shrink-0",children:s.jsx(N,{size:18,className:"text-white"})}),s.jsx("span",{className:"truncate",children:"Favoritos"})]})]})]}),s.jsxs("div",{children:[s.jsx("h3",{className:"text-gray-500 text-xs font-medium px-4 mb-2",children:"Bônus"}),s.jsxs("div",{className:"space-y-1",children:[s.jsxs("div",{className:"menu-item",children:[s.jsx("div",{className:"bg-[#1A191F] p-1.5 rounded-md flex-shrink-0",children:s.jsx(p,{size:18,className:"text-green-500"})}),s.jsx("span",{className:"truncate",children:"Código Promocional"})]}),s.jsxs("div",{className:"menu-item",children:[s.jsx("div",{className:"bg-[#1A191F] p-1.5 rounded-md flex-shrink-0",children:s.jsx(f,{size:18,className:"text-white"})}),s.jsx("span",{className:"truncate",children:"Programa de Fidelidade"})]}),s.jsxs("div",{className:"menu-item",children:[s.jsx("div",{className:"bg-[#1A191F] p-1.5 rounded-md flex-shrink-0",children:s.jsx(g,{size:18,className:"text-white"})}),s.jsx("span",{className:"truncate",children:"Programa de Indicação"})]}),s.jsxs("div",{className:"menu-item",children:[s.jsx("div",{className:"bg-[#1A191F] p-1.5 rounded-md flex-shrink-0",children:s.jsx(v,{size:18,className:"text-white"})}),s.jsx("span",{className:"truncate",children:"Loteria"})]})]})]}),s.jsxs("div",{children:[s.jsx("h3",{className:"text-gray-500 text-xs font-medium px-4 mb-2",children:"Configurações"}),s.jsx("div",{className:"space-y-1",children:x.map(e=>s.jsxs("div",{className:`menu-item ${l===e.id?"active":""}`,onClick:()=>h(e.id),children:[s.jsx("div",{className:"bg-[#1A191F] p-1.5 rounded-md flex-shrink-0",children:s.jsx(e.icon,{size:18,className:l===e.id?"text-green-400":"text-white"})}),s.jsx("span",{className:"truncate",children:e.label})]},e.id))})]}),s.jsxs("div",{children:[s.jsx("h3",{className:"text-gray-500 text-xs font-medium px-4 mb-2",children:"Outros"}),s.jsxs("div",{className:"space-y-1",children:[s.jsxs("div",{className:"menu-item",children:[s.jsx("div",{className:"bg-[#1A191F] p-1.5 rounded-md flex-shrink-0",children:s.jsx(z,{size:18,className:"text-white"})}),s.jsx("span",{className:"truncate",children:"Estatísticas"})]}),s.jsxs("div",{className:"menu-item",children:[s.jsx("div",{className:"bg-[#1A191F] p-1.5 rounded-md flex-shrink-0",children:s.jsx(F,{size:18,className:"text-white"})}),s.jsx("span",{className:"truncate",children:"Jogo Justo"})]}),s.jsxs("div",{className:"menu-item",children:[s.jsx("div",{className:"bg-[#1A191F] p-1.5 rounded-md flex-shrink-0",children:s.jsx(w,{size:18,className:"text-white"})}),s.jsx("span",{className:"truncate",children:"Suporte"})]})]})]})]}),s.jsxs("div",{className:"space-y-2 mt-auto",children:[s.jsxs("div",{className:"bg-[#22202a] rounded-md p-2 flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity",children:[s.jsx("div",{className:"bg-[#1A191F] p-1 rounded-md flex-shrink-0",children:s.jsx(A,{size:18,className:"text-gray-400"})}),s.jsx("span",{className:"text-gray-300 truncate",children:"Telegram"})]}),s.jsxs("div",{className:"bg-[#22202a] rounded-md p-2 flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity",children:[s.jsxs("div",{className:"flex items-center gap-2",children:[s.jsx("div",{className:"bg-[#1A191F] p-1 rounded-md flex-shrink-0",children:s.jsx(C,{size:18,className:"text-gray-400"})}),s.jsx("span",{className:"text-gray-300 truncate",children:"Português"})]}),s.jsx(S,{size:14,className:"text-gray-400"})]})]})]});return a?r?s.jsx("div",{className:"mobile-sidebar",onClick:n,children:s.jsx("div",{className:t,onClick:e=>e.stopPropagation(),children:c})}):null:s.jsx("div",{className:t,children:c})};export{G as S};
