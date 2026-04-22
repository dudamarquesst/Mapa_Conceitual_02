const protocolData = {
    dns: {
        title: "Domain Name System (DNS)",
        icon: "📖",
        color: "text-brand-accent",
        functioning: "Atua como a lista telefônica da internet. Recebe uma URL amigável digitada pelo usuário e traduz para um endereço de IP que as máquinas utilizam para se comunicar.",
        relations: "É o <strong>Passo 0</strong> da comunicação. Sem o DNS, não conseguiríamos iniciar conexões HTTP ou FTP sem memorizar sequências complexas de números (IPs).",
        example: "Ao digitar <code>ceub.br</code>, o navegador consulta o DNS antes mesmo do handshake TCP, obtendo o IP do servidor para iniciar a requisição."
    },
    http: {
        title: "HTTP & HTTPS",
        icon: "🌍",
        color: "text-brand-accent",
        functioning: "Baseado na arquitetura Cliente/Servidor (Request/Response). O <strong>HTTP</strong> trafega na porta 80 em texto plano. O <strong>HTTPS</strong> (porta 443) engloba o protocolo TLS/SSL, adicionando criptografia, integridade e autenticação via Handshake (assimétrico para autenticação, simétrico para velocidade).",
        relations: "Roda na Camada de Aplicação e utiliza exclusivamente o TCP na Camada de Transporte para garantir que nenhuma parte da página web seja perdida.",
        example: "Inspecionar a aba <em>Network</em> (F12) no navegador. Podemos visualizar os métodos (GET/POST) e os Status Codes (ex: 200 OK ou 404 Not Found)."
    },
    tcp: {
        title: "A Pilha TCP/IP",
        icon: "📦",
        color: "text-purple-400",
        functioning: "Modelo arquitetural de 4 camadas: 1. Aplicação, 2. Transporte, 3. Rede (IP), 4. Interface. Utiliza o processo de <strong>Encapsulamento</strong>, onde os dados ganham cabeçalhos à medida que descem as camadas (Dados → Segmentos → Datagramas → Quadros).",
        relations: "É a fundação. Na Camada de Transporte, decide-se entre <strong>TCP</strong> (conexão confiável, exige Handshake, usado por HTTP/FTP/WS) e <strong>UDP</strong> (rápido, não orientado, usado em Streaming).",
        example: "O roteamento 'Batata Quente' do protocolo IP na camada de rede, encontrando o melhor caminho entre roteadores para entregar o pacote."
    },
    ftp: {
        title: "FTP & SFTP",
        icon: "📁",
        color: "text-brand-accent",
        functioning: "Protocolos para transferência em lote. O <strong>FTP</strong> possui arquitetura <em>Out-of-Band</em>, usando duas portas (21 Controle, 20 Dados). Mantém o estado da conexão, mas não tem criptografia. O <strong>SFTP</strong> é baseado em túnel SSH seguro, criptografando comandos e dados.",
        relations: "Diferente do HTTP (que é Stateless e fecha a conexão), o FTP mantém a sessão aberta, lembrando a autenticação e o diretório corrente.",
        example: "Uso do Modo Passivo (PASV) em scripts desenvolvidos no laboratório para evitar bloqueios de Firewalls locais durante a conexão de dados."
    },
    ws: {
        title: "WebSockets",
        icon: "⚡",
        color: "text-brand-accent",
        functioning: "Cria um canal <em>Full-Duplex</em> permanente. Inicia como uma requisição HTTP normal, mas solicita um <em>Upgrade</em> no cabeçalho. Após o handshake, os dados fluem livremente de forma bidirecional sem necessidade de novas requisições.",
        relations: "Evolução direta contra o problema do HTTP <em>Polling</em>. Elimina o 'overhead' (custo de processamento) de o cliente precisar perguntar repetidamente ao servidor se há novos dados.",
        example: "Implementação em arquiteturas de tempo real (Real-time), como chats online da aula, dashboards financeiros ao vivo ou jogos multiplayer."
    }
};

// Seletores do DOM
const modalOverlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');
const modalBody = document.getElementById('modal-body');

// Função para abrir o modal e injetar os dados corretos
function openModal(id) {
    const data = protocolData[id];
    
    // Injeta o conteúdo dinâmico
    modalBody.innerHTML = `
        <div class="flex items-center gap-3 mb-6 border-b border-slate-700 pb-4">
            <span class="text-4xl">${data.icon}</span>
            <h2 class="text-3xl font-bold ${data.color}">${data.title}</h2>
        </div>
        
        <div class="space-y-6 text-slate-300">
            <div>
                <h3 class="text-white font-semibold flex items-center gap-2 mb-2"><span class="w-1.5 h-1.5 rounded-full bg-brand-accent"></span> Funcionamento</h3>
                <p class="leading-relaxed text-sm bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">${data.functioning}</p>
            </div>
            
            <div>
                <h3 class="text-white font-semibold flex items-center gap-2 mb-2"><span class="w-1.5 h-1.5 rounded-full bg-purple-400"></span> Relações e Diferenças</h3>
                <p class="leading-relaxed text-sm bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">${data.relations}</p>
            </div>

            <div>
                <h3 class="text-white font-semibold flex items-center gap-2 mb-2"><span class="w-1.5 h-1.5 rounded-full bg-green-400"></span> Aplicação Prática (Aula)</h3>
                <p class="leading-relaxed text-sm bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">${data.example}</p>
            </div>
        </div>
    `;

    // Revela o modal
    modalOverlay.classList.remove('hidden');
    
    // Delay minúsculo para a animação do CSS funcionar
    setTimeout(() => {
        modalOverlay.classList.remove('opacity-0');
        modalContent.classList.remove('scale-95');
        modalContent.classList.add('scale-100');
    }, 10);
}

// Função para fechar o modal
function closeModal() {
    modalOverlay.classList.add('opacity-0');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');
    
    setTimeout(() => {
        modalOverlay.classList.add('hidden');
    }, 300);
}

// Fecha o modal ao clicar na área escura (overlay)
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Fecha o modal ao apertar a tecla ESC no teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modalOverlay.classList.contains('hidden')) {
        closeModal();
    }
});