/* =========================================================
   Foto Ferrara — catálogo de produtos
   Fonte: posts e destaques do Instagram do cliente (@fotoferrara).

   - tipo "fixo":      preço fechado -> pode ir para o carrinho do site
   - tipo "a-partir":  preço inicial, depende da personalização -> WhatsApp
   - tipo "consulta":  sem preço publicado -> WhatsApp

   >>> CONFERIR PREÇOS E DISPONIBILIDADE COM O CLIENTE ANTES DE PUBLICAR <<<
   ========================================================= */

const WHATSAPP = '551132589351';        // número da bio do Instagram
const WHATSAPP_TEXTO = '(11) 3258-9351';

const CATEGORIAS = {
    'relogios': 'Relógios',
    'relogios-parede': 'Relógios de Parede',
    'conserto': 'Conserto de Relógios',
    'cameras': 'Câmeras e Filmes',
    'revelacao': 'Revelação e Fotos',
    'conversao': 'Conversão e Restauração',
    'canecas': 'Canecas',
    'presentes': 'Presentes Personalizados',
    'grafica': 'Banners e Cartões',
    'eletronicos': 'Eletrônicos'
};

// Agrupamento usado no menu do topo e no rodapé
const MENU = [
    { label: 'Relógios', cats: ['relogios', 'relogios-parede', 'conserto'] },
    { label: 'Câmeras e Filmes', cats: ['cameras'] },
    { label: 'Revelação e Fotos', cats: ['revelacao', 'conversao'] },
    { label: 'Canecas e Presentes', cats: ['canecas', 'presentes', 'grafica'] },
    { label: 'Eletrônicos', cats: ['eletronicos'] }
];

const TIPOS_COMPRA = { site: 'Compra pelo site', whatsapp: 'Encomenda pelo WhatsApp' };

const P = (id, cat, marca, nome, desc, preco, tipo, icone, extra = {}) =>
    ({ id, cat, marca, nome, desc, preco, tipo, icone, imagem: extra.imagem || (`assets/img/produtos/${id}.jpg`), ...extra });

const PRODUTOS = [
    /* ---------- Relógios ---------- */
    P('citizen-quartz', 'relogios', 'Citizen', 'Citizen Quartz Dourado', 'Mostrador preto, design clássico e acabamento sofisticado. Qualidade Citizen, resistente à água.', 1390, 'fixo', 'watch'),
    P('citizen-automatico', 'relogios', 'Citizen', 'Citizen Automático Dourado', 'Automático de alta precisão, com pulseira de couro e mostrador branco. Qualidade Citizen.', 1560, 'fixo', 'watch'),
    P('seiko-automatico', 'relogios', 'Seiko', 'Seiko Automático', 'Relógio Seiko automático com pulseira de aço.', 658, 'fixo', 'watch'),
    P('orient-prata', 'relogios', 'Orient', 'Orient Prata com Calendário', 'Relógio Orient com pulseira de aço e calendário de dia e data.', 598, 'fixo', 'watch'),
    P('orient-feminino', 'relogios', 'Orient', 'Orient Feminino Dourado e Prata', 'Relógio feminino Orient com pulseira bicolor, prata e dourada.', 960, 'fixo', 'watch'),
    P('orient-garantia', 'relogios', 'Orient', 'Orient Original com Garantia', 'Modelos Orient originais, com 1 ano de garantia. Consulte os modelos disponíveis.', null, 'consulta', 'watch'),
    P('casio-185', 'relogios', 'Casio', 'Casio Analógico-Digital Preto', 'Casio analógico-digital com mostrador prata e pulseira preta.', 185, 'fixo', 'watch'),
    P('casio-vintage-prata', 'relogios', 'Casio', 'Casio Vintage Prata', 'Casio digital vintage com pulseira de aço prateada.', 225, 'fixo', 'smartwatch'),
    P('casio-retro-dourado', 'relogios', 'Casio', 'Casio Retrô Dourado', 'Casio digital retrô dourado.', 290, 'fixo', 'smartwatch'),
    P('casio-dourado-classico', 'relogios', 'Casio', 'Casio Dourado Clássico', 'Casio digital dourado com pulseira de aço.', 270, 'fixo', 'smartwatch'),
    P('casio-f91w', 'relogios', 'Casio', 'Casio F-91W Preto', 'Casio F-91W digital preto, com alarme e cronógrafo.', null, 'consulta', 'smartwatch'),
    P('champion-smartwatch', 'relogios', 'Champion', 'Champion Smart Watch', 'Smartwatch Champion em promoção, em vários modelos e cores.', 499, 'fixo', 'smartwatch', { antigo: 599 }),
    P('champion-led', 'relogios', 'Champion', 'Champion Digital LED Quadrado', 'Champion digital com display LED quadrado e pulseira de malha, em várias cores.', 259, 'a-partir', 'smartwatch'),
    P('champion-led-feminino', 'relogios', 'Champion', 'Champion LED Feminino Rosé', 'Champion LED feminino com pulseira de malha rosé.', null, 'consulta', 'smartwatch'),
    P('champion-cristais', 'relogios', 'Champion', 'Champion Digital com Cristais', 'Champion digital com cristais no aro.', null, 'consulta', 'smartwatch'),
    P('champion-kit', 'relogios', 'Champion', 'Kit Champion: Relógio + Brincos + Colar', 'Kit com relógio dourado, brincos e colar. Ótimo para presentear.', 279, 'fixo', 'gift'),
    P('champion-conjunto', 'relogios', 'Champion', 'Conjunto Champion com Bijuteria', 'Conjunto Champion com relógio rosé e bijuteria (colar).', null, 'consulta', 'gift'),
    P('relogio-feminino-dourado', 'relogios', null, 'Relógio Feminino Dourado', 'Linha feminina em dourado, ótima opção de presente.', 249, 'a-partir', 'watch'),

    /* ---------- Relógios de parede ---------- */
    P('parede-passaros', 'relogios-parede', 'Herweg', 'Relógio de Parede Pássaros', 'Mostrador com pássaros brasileiros e moldura de madeira.', null, 'consulta', 'clock'),
    P('parede-mapa', 'relogios-parede', 'Herweg', 'Relógio de Parede Mapa Vintage', 'Números romanos e mostrador estilo mapa antigo, com aro vermelho.', null, 'consulta', 'clock'),
    P('parede-bigben', 'relogios-parede', null, 'Relógio de Parede Big Ben', 'Mostrador com a torre do Big Ben e aro roxo.', null, 'consulta', 'clock'),
    P('parede-elvis', 'relogios-parede', null, 'Relógio de Parede Elvis', 'Mostrador vintage com aro preto.', null, 'consulta', 'clock'),
    P('parede-marilyn', 'relogios-parede', null, 'Relógio de Parede Marilyn Monroe', 'Mostrador artístico em estilo retrô.', null, 'consulta', 'clock'),
    P('parede-carrilhao', 'relogios-parede', null, 'Relógio de Parede Carrilhão', 'Carrilhão de madeira com pêndulo dourado.', null, 'consulta', 'pendulum'),
    P('parede-variados', 'relogios-parede', 'Herweg', 'Relógios de Parede Variados', 'Diversos modelos Herweg para decorar a sua casa.', null, 'consulta', 'clock'),

    /* ---------- Conserto de relógios ---------- */
    P('troca-bateria', 'conserto', null, 'Troca de Bateria', 'Troca de bateria para relógios de diversas marcas.', null, 'consulta', 'gear'),
    P('conserto-restauracao', 'conserto', null, 'Conserto e Restauração de Relógios', 'Reparo e restauração de relógios, com todo o cuidado.', null, 'consulta', 'gear'),

    /* ---------- Câmeras e filmes ---------- */
    P('instax-mini-9', 'cameras', 'Fujifilm', 'Câmera Instax Mini 9', 'Câmera instantânea Fujifilm: fotos reveladas na hora. Promoção.', 499, 'fixo', 'instant-camera', { antigo: 599 }),
    P('filme-instax-mini', 'cameras', 'Fujifilm', 'Filme Instax Mini', 'Filme para câmeras instantâneas Instax Mini.', null, 'consulta', 'polaroid'),
    P('olympus-analogica', 'cameras', 'Olympus', 'Câmera Analógica Olympus', 'Câmera compacta analógica Olympus.', 370, 'fixo', 'camera'),
    P('canon-prima', 'cameras', 'Canon', 'Câmera Analógica Canon Prima', 'Câmera compacta analógica Canon Prima.', 160, 'fixo', 'camera'),
    P('sony-digital', 'cameras', 'Sony', 'Câmera Digital Sony', 'Câmera digital compacta Sony. Consulte a disponibilidade.', null, 'consulta', 'camera'),
    P('filme-fuji-200', 'cameras', 'Fujifilm', 'Filme 35mm Fujifilm 200', 'Filme colorido 35mm Fujifilm ISO 200.', null, 'consulta', 'film-roll'),
    P('filme-fuji-400', 'cameras', 'Fujifilm', 'Filme 35mm Fujifilm 400', 'Filme colorido 35mm Fujifilm ISO 400.', null, 'consulta', 'film-roll'),
    P('filme-kodak-200', 'cameras', 'Kodak', 'Filme 35mm Kodak 200', 'Filme colorido 35mm Kodak ISO 200.', null, 'consulta', 'film-roll'),
    P('filme-kodak-e100', 'cameras', 'Kodak', 'Filme Kodak Ektachrome E100', 'Filme profissional reversível (slides) Kodak Ektachrome, ISO 100.', null, 'consulta', 'film-roll'),

    /* ---------- Revelação e fotos ---------- */
    P('revelacao-fotos', 'revelacao', null, 'Revelação de Fotos', 'Todos os tamanhos, em papel fotográfico com alta qualidade de definição e impressão.', 0.75, 'a-partir', 'image', { unidade: 'por foto' }),
    P('revelacao-analogica', 'revelacao', null, 'Revelação Analógica', 'Revelamos os seus filmes em até 3 dias úteis.', null, 'consulta', 'film-strip'),
    P('digitalizacao-filmes', 'revelacao', null, 'Digitalização de Filmes', 'Digitalização em alta qualidade, com arquivos digitais seguros e cuidado com cada memória.', null, 'consulta', 'film-strip'),
    P('foto-polaroid', 'revelacao', null, 'Foto Polaroid', 'Suas fotos em estilo Polaroid.', 5, 'a-partir', 'polaroid', { unidade: 'cada' }),
    P('fotos-3x4', 'revelacao', null, 'Fotos 3x4, 2x2 e 5x7', 'Fotos para documentos em vários tamanhos.', null, 'consulta', 'idphoto'),
    P('ima-foto', 'revelacao', null, 'Ímã de Foto', 'Lembrancinhas com ímã e a sua foto.', null, 'consulta', 'magnet'),
    P('album-160', 'revelacao', null, 'Álbum para 160 Fotos', 'Álbuns novos com desconto, para guardar até 160 fotos.', null, 'consulta', 'book-open'),
    P('varal-polaroid', 'revelacao', null, 'Varal de Fotos Estilo Polaroid', 'Transforme as suas fotos em mini polaroids para decorar.', null, 'consulta', 'polaroid'),

    /* ---------- Conversão e restauração ---------- */
    P('vhs-dvd', 'conversao', null, 'Conversão de VHS para DVD', 'Conversão profissional, com qualidade de imagem e som, para preservar as suas memórias.', null, 'consulta', 'vhs'),
    P('midias-antigas', 'conversao', null, 'Conversão de Mídias Antigas', 'Resgate as suas memórias: VHS, fitas e outras mídias para formato digital.', null, 'consulta', 'disc'),
    P('videos-celular-dvd', 'conversao', null, 'Vídeos de Celular e Câmera para DVD', 'Passamos vídeos de celular e câmera digital para DVD, em qualquer formato.', null, 'consulta', 'video'),
    P('restauracao-fotos', 'conversao', null, 'Restauração de Fotos Antigas', 'Recuperação e restauração de fotografias antigas.', null, 'consulta', 'image'),
    P('retrospectivas', 'conversao', null, 'Retrospectivas Animadas', 'Eternize momentos marcantes da sua vida em vídeo.', null, 'consulta', 'film-strip'),

    /* ---------- Canecas ---------- */
    P('caneca-personalizada', 'canecas', null, 'Caneca Personalizada', 'Personalize com as suas fotos e frases, em vários modelos.', 35, 'a-partir', 'coffee'),
    P('caneca-magica', 'canecas', null, 'Caneca Mágica', 'Preta por fora: revela a sua foto quando recebe uma bebida quente.', null, 'consulta', 'coffee'),
    P('caneca-glitter', 'canecas', null, 'Caneca com Glitter', 'Acabamento em glitter, nas cores rosa e dourado.', null, 'consulta', 'coffee'),
    P('caneca-metalizada', 'canecas', null, 'Caneca Metalizada', 'Acabamento metalizado dourado ou rosê, personalizada do seu jeito.', null, 'consulta', 'coffee'),
    P('caneca-preta', 'canecas', null, 'Caneca Preta Personalizada', 'Caneca preta com estampas divertidas e temáticas.', null, 'consulta', 'coffee'),

    /* ---------- Presentes personalizados ---------- */
    P('camiseta-estampada', 'presentes', null, 'Camiseta Estampada Personalizada', 'Estampas com a sua foto ou arte, em todos os tamanhos.', 40, 'a-partir', 'tshirt'),
    P('chaveiro-filme', 'presentes', null, 'Chaveiro de Filme', 'Chaveiro em formato de rolo de filme, com fotos suas.', null, 'consulta', 'keychain'),
    P('chaveiro-acrilico', 'presentes', null, 'Chaveiro Acrílico com Foto', 'Chaveiro de acrílico transparente com foto e mensagem.', null, 'consulta', 'keychain'),
    P('cubo-fotos', 'presentes', null, 'Cubo de Fotos', 'Cubo giratório com base, com fotos nas faces.', null, 'consulta', 'cube'),
    P('bola-natal', 'presentes', null, 'Decoração de Natal Personalizada', 'Bolas de Natal personalizadas com foto.', null, 'consulta', 'ornament'),

    /* ---------- Banners e cartões ---------- */
    P('banner', 'grafica', null, 'Banner Personalizado', 'Banners para aniversários e eventos.', null, 'consulta', 'banner'),
    P('cartao-visita', 'grafica', null, 'Cartão de Visita', 'Cartões de visita personalizados.', null, 'consulta', 'card'),

    /* ---------- Eletrônicos ---------- */
    P('mouse-gamer', 'eletronicos', 'Multilaser', 'Mouse Gamer Multilaser', 'Sensor de 2400 DPI, 7 cores pulsantes e corpo emborrachado. 3 anos de garantia.', null, 'consulta', 'mouse'),
    P('mouse-sem-fio', 'eletronicos', 'Multilaser', 'Mouses Sem Fio Multilaser', 'Vários modelos e cores de mouses.', null, 'consulta', 'mouse'),
    P('echo-dot', 'eletronicos', 'Amazon', 'Echo Dot (Alexa)', 'Tenha a Alexa em qualquer ambiente.', null, 'consulta', 'speaker')
];

// Regras de exemplo do frete (ajustar depois)
const FRETE_FIXO = 15;
const FRETE_GRATIS_ACIMA = 200;

/* =========================================================
   Ilustrações de produto — SVG inline, sem dependência externa
   Duas cores (var(--color-accent) / var(--color-gold)) pra combinar com a marca
   ========================================================= */
const ILUSTRACOES = {
    // Impressões / papel
    image: `<svg viewBox="0 0 64 64" fill="none"><rect x="8" y="20" width="40" height="30" rx="2" fill="var(--color-gold-light)" stroke="var(--color-accent)" stroke-width="2" transform="rotate(-6 28 35)"/><rect x="16" y="14" width="40" height="30" rx="2" fill="#fff" stroke="var(--color-accent)" stroke-width="2"/><circle cx="24" cy="22" r="3" fill="var(--color-gold)"/><path d="M20 38l7-8 6 6 5-5 8 7v4H20z" fill="var(--color-accent)" opacity=".85"/></svg>`,
    layers: `<svg viewBox="0 0 64 64" fill="none"><rect x="12" y="30" width="36" height="8" rx="2" fill="var(--color-gold-light)" stroke="var(--color-accent)" stroke-width="2"/><rect x="14" y="22" width="36" height="8" rx="2" fill="var(--color-gold-light)" stroke="var(--color-accent)" stroke-width="2"/><rect x="16" y="14" width="36" height="8" rx="2" fill="#fff" stroke="var(--color-accent)" stroke-width="2"/></svg>`,
    'book-open': `<svg viewBox="0 0 64 64" fill="none"><path d="M32 16c-6-4-14-4-20-1v30c6-3 14-3 20 1V16z" fill="#fff" stroke="var(--color-accent)" stroke-width="2"/><path d="M32 16c6-4 14-4 20-1v30c-6-3-14-3-20 1V16z" fill="var(--color-gold-light)" stroke="var(--color-accent)" stroke-width="2"/><path d="M32 16v30" stroke="var(--color-accent)" stroke-width="2"/></svg>`,
    // Molduras / decoração
    frame: `<svg viewBox="0 0 64 64" fill="none"><rect x="12" y="10" width="40" height="44" rx="2" fill="var(--color-gold)" opacity=".25"/><rect x="16" y="14" width="32" height="36" rx="1" fill="#fff" stroke="var(--color-accent)" stroke-width="2"/><circle cx="24" cy="23" r="3" fill="var(--color-gold)"/><path d="M18 42l8-10 6 7 6-6 6 6v3H18z" fill="var(--color-accent)" opacity=".85"/><rect x="12" y="10" width="40" height="44" rx="2" fill="none" stroke="var(--color-accent)" stroke-width="2.5"/></svg>`,
    // Câmeras e acessórios
    camera: `<svg viewBox="0 0 64 64" fill="none"><rect x="10" y="22" width="44" height="28" rx="4" fill="#fff" stroke="var(--color-accent)" stroke-width="2"/><rect x="24" y="15" width="14" height="8" rx="2" fill="var(--color-accent)"/><circle cx="32" cy="36" r="10" fill="var(--color-gold-light)" stroke="var(--color-accent)" stroke-width="2"/><circle cx="32" cy="36" r="4.5" fill="var(--color-accent)"/><circle cx="46" cy="28" r="2" fill="var(--color-gold)"/></svg>`,
    aperture: `<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="20" fill="none" stroke="var(--color-accent)" stroke-width="2"/><g fill="var(--color-gold)" opacity=".85"><path d="M32 14l6 11-12 0z"/><path d="M48.6 23l-6 11 12.9-2z" transform="rotate(72 32 32)"/><path d="M48.6 23l-6 11 12.9-2z" transform="rotate(144 32 32)"/><path d="M48.6 23l-6 11 12.9-2z" transform="rotate(216 32 32)"/><path d="M48.6 23l-6 11 12.9-2z" transform="rotate(288 32 32)"/></g><circle cx="32" cy="32" r="6" fill="#fff" stroke="var(--color-accent)" stroke-width="2"/></svg>`,
    'hard-drive': `<svg viewBox="0 0 64 64" fill="none"><rect x="10" y="14" width="34" height="42" rx="3" fill="#fff" stroke="var(--color-accent)" stroke-width="2"/><rect x="10" y="14" width="34" height="10" fill="var(--color-accent)"/><rect x="16" y="34" width="22" height="4" rx="1" fill="var(--color-gold-light)"/><rect x="16" y="42" width="14" height="4" rx="1" fill="var(--color-gold-light)"/><circle cx="37" cy="18.5" r="2" fill="var(--color-gold)"/></svg>`,
    lamp: `<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="30" r="18" fill="none" stroke="var(--color-accent)" stroke-width="2"/><circle cx="32" cy="30" r="18" fill="var(--color-gold-light)" opacity=".5"/><circle cx="32" cy="30" r="10" fill="#fff" stroke="var(--color-accent)" stroke-width="2"/><rect x="29" y="48" width="6" height="10" rx="2" fill="var(--color-accent)"/></svg>`,
    sun: `<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="11" fill="var(--color-gold-light)" stroke="var(--color-accent)" stroke-width="2"/><g stroke="var(--color-gold)" stroke-width="3" stroke-linecap="round"><line x1="32" y1="6" x2="32" y2="14"/><line x1="32" y1="50" x2="32" y2="58"/><line x1="6" y1="32" x2="14" y2="32"/><line x1="50" y1="32" x2="58" y2="32"/><line x1="13" y1="13" x2="18.5" y2="18.5"/><line x1="45.5" y1="45.5" x2="51" y2="51"/><line x1="51" y1="13" x2="45.5" y2="18.5"/><line x1="18.5" y1="45.5" x2="13" y2="51"/></g></svg>`,
    printer: `<svg viewBox="0 0 64 64" fill="none"><rect x="12" y="24" width="40" height="20" rx="2" fill="#fff" stroke="var(--color-accent)" stroke-width="2"/><rect x="18" y="12" width="28" height="14" fill="var(--color-gold-light)" stroke="var(--color-accent)" stroke-width="2"/><rect x="18" y="40" width="28" height="16" fill="var(--color-accent)"/><rect x="22" y="44" width="20" height="9" fill="#fff"/><circle cx="45" cy="31" r="2" fill="var(--color-gold)"/></svg>`,
    droplet: `<svg viewBox="0 0 64 64" fill="none"><path d="M32 10c8 12 16 20 16 30a16 16 0 0 1-32 0c0-10 8-18 16-30z" fill="var(--color-gold-light)" stroke="var(--color-accent)" stroke-width="2"/><ellipse cx="27" cy="38" rx="4" ry="6" fill="#fff" opacity=".7"/></svg>`,
    // Foto-presentes
    coffee: `<svg viewBox="0 0 64 64" fill="none"><rect x="12" y="20" width="28" height="26" rx="3" fill="#fff" stroke="var(--color-accent)" stroke-width="2"/><path d="M40 24h6a7 7 0 0 1 0 14h-6" fill="none" stroke="var(--color-accent)" stroke-width="2"/><path d="M17 20c0-4 3-7 3-10" stroke="var(--color-gold)" stroke-width="2" stroke-linecap="round"/><path d="M25 20c0-4 3-7 3-10" stroke="var(--color-gold)" stroke-width="2" stroke-linecap="round"/><rect x="12" y="20" width="28" height="7" fill="var(--color-gold-light)"/></svg>`,
    clock: `<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="21" fill="#fff" stroke="var(--color-accent)" stroke-width="2.5"/><circle cx="32" cy="32" r="21" fill="var(--color-gold-light)" opacity=".3"/><path d="M32 20v13l9 5" stroke="var(--color-accent)" stroke-width="2.5" stroke-linecap="round" fill="none"/><circle cx="32" cy="32" r="2.5" fill="var(--color-gold)"/></svg>`,
    // ----- Relógios -----
    watch: `<svg viewBox="0 0 64 64" fill="none"><rect x="25" y="4" width="14" height="14" rx="2" fill="var(--color-gold-light)" stroke="var(--color-accent)" stroke-width="2"/><rect x="25" y="46" width="14" height="14" rx="2" fill="var(--color-gold-light)" stroke="var(--color-accent)" stroke-width="2"/><circle cx="32" cy="32" r="16" fill="#fff" stroke="var(--color-accent)" stroke-width="2.5"/><circle cx="32" cy="32" r="12" fill="var(--color-gold-light)" opacity=".5"/><path d="M32 23v9l6 4" stroke="var(--color-accent)" stroke-width="2.2" stroke-linecap="round"/><circle cx="32" cy="32" r="2" fill="var(--color-gold)"/><rect x="47" y="29" width="4" height="6" rx="1" fill="var(--color-gold)"/></svg>`,
    smartwatch: `<svg viewBox="0 0 64 64" fill="none"><rect x="24" y="4" width="16" height="12" rx="2" fill="var(--color-gold-light)" stroke="var(--color-accent)" stroke-width="2"/><rect x="24" y="48" width="16" height="12" rx="2" fill="var(--color-gold-light)" stroke="var(--color-accent)" stroke-width="2"/><rect x="16" y="14" width="32" height="36" rx="7" fill="var(--color-accent)"/><rect x="20" y="18" width="24" height="28" rx="4" fill="#fff"/><text x="32" y="36" text-anchor="middle" font-family="Outfit,sans-serif" font-size="11" font-weight="700" fill="var(--color-accent)">12:30</text></svg>`,
    gift: `<svg viewBox="0 0 64 64" fill="none"><rect x="10" y="28" width="44" height="26" rx="3" fill="#fff" stroke="var(--color-accent)" stroke-width="2"/><rect x="8" y="20" width="48" height="10" rx="2" fill="var(--color-gold-light)" stroke="var(--color-accent)" stroke-width="2"/><path d="M32 20v34" stroke="var(--color-gold)" stroke-width="4"/><path d="M32 20c-4-9-14-8-12-2 1 4 8 2 12 2zM32 20c4-9 14-8 12-2-1 4-8 2-12 2z" fill="none" stroke="var(--color-accent)" stroke-width="2"/></svg>`,
    pendulum: `<svg viewBox="0 0 64 64" fill="none"><path d="M24 8h16l4 8v38a3 3 0 0 1-3 3H23a3 3 0 0 1-3-3V16z" fill="#fff" stroke="var(--color-accent)" stroke-width="2"/><circle cx="32" cy="22" r="7" fill="var(--color-gold-light)" stroke="var(--color-accent)" stroke-width="2"/><path d="M32 18v4l3 2" stroke="var(--color-accent)" stroke-width="1.8" stroke-linecap="round"/><path d="M32 31v16" stroke="var(--color-accent)" stroke-width="2"/><circle cx="32" cy="48" r="4" fill="var(--color-gold)" stroke="var(--color-accent)" stroke-width="1.5"/></svg>`,
    gear: `<svg viewBox="0 0 64 64" fill="none"><g stroke="var(--color-accent)" stroke-width="6" stroke-linecap="round"><line x1="32" y1="9" x2="32" y2="15"/><line x1="32" y1="49" x2="32" y2="55"/><line x1="9" y1="32" x2="15" y2="32"/><line x1="49" y1="32" x2="55" y2="32"/><line x1="16" y1="16" x2="20" y2="20"/><line x1="44" y1="44" x2="48" y2="48"/><line x1="48" y1="16" x2="44" y2="20"/><line x1="20" y1="44" x2="16" y2="48"/></g><circle cx="32" cy="32" r="15" fill="var(--color-gold-light)" stroke="var(--color-accent)" stroke-width="2"/><circle cx="32" cy="32" r="5.5" fill="#fff" stroke="var(--color-accent)" stroke-width="2"/></svg>`,
    // ----- Câmeras, filmes e fotos -----
    'instant-camera': `<svg viewBox="0 0 64 64" fill="none"><rect x="10" y="16" width="44" height="36" rx="6" fill="#fff" stroke="var(--color-accent)" stroke-width="2"/><path d="M10 28V22a6 6 0 0 1 6-6h32a6 6 0 0 1 6 6v6z" fill="var(--color-gold-light)"/><circle cx="32" cy="39" r="10" fill="var(--color-gold-light)" stroke="var(--color-accent)" stroke-width="2"/><circle cx="32" cy="39" r="5" fill="var(--color-accent)"/><rect x="14" y="20" width="9" height="5" rx="1" fill="var(--color-accent)"/><circle cx="46" cy="22" r="2.5" fill="var(--color-gold)"/></svg>`,
    polaroid: `<svg viewBox="0 0 64 64" fill="none"><g transform="rotate(-5 32 32)"><rect x="14" y="8" width="36" height="46" rx="2" fill="#fff" stroke="var(--color-accent)" stroke-width="2"/><rect x="19" y="14" width="26" height="26" fill="var(--color-gold-light)" stroke="var(--color-accent)" stroke-width="1.5"/><path d="M21 38l7-8 5 5 4-4 7 7z" fill="var(--color-accent)" opacity=".85"/><circle cx="27" cy="21" r="2.5" fill="var(--color-gold)"/></g></svg>`,
    'film-roll': `<svg viewBox="0 0 64 64" fill="none"><rect x="12" y="14" width="30" height="40" rx="4" fill="var(--color-gold)" stroke="var(--color-accent)" stroke-width="2"/><rect x="18" y="8" width="18" height="8" rx="2" fill="var(--color-accent)"/><rect x="16" y="26" width="22" height="14" fill="#fff" stroke="var(--color-accent)" stroke-width="1.5"/><text x="27" y="36.5" text-anchor="middle" font-family="Outfit,sans-serif" font-size="9" font-weight="700" fill="var(--color-accent)">200</text><rect x="42" y="30" width="14" height="18" fill="var(--color-accent)"/><g fill="#fff"><rect x="44" y="33" width="3" height="3" rx=".6"/><rect x="44" y="39" width="3" height="3" rx=".6"/><rect x="44" y="45" width="3" height="2" rx=".6"/><rect x="51" y="33" width="3" height="3" rx=".6"/><rect x="51" y="39" width="3" height="3" rx=".6"/><rect x="51" y="45" width="3" height="2" rx=".6"/></g></svg>`,
    'film-strip': `<svg viewBox="0 0 64 64" fill="none"><rect x="6" y="14" width="52" height="36" rx="3" fill="var(--color-accent)"/><g fill="#fff"><rect x="10" y="17" width="4" height="4" rx="1"/><rect x="18" y="17" width="4" height="4" rx="1"/><rect x="26" y="17" width="4" height="4" rx="1"/><rect x="34" y="17" width="4" height="4" rx="1"/><rect x="42" y="17" width="4" height="4" rx="1"/><rect x="50" y="17" width="4" height="4" rx="1"/><rect x="10" y="43" width="4" height="4" rx="1"/><rect x="18" y="43" width="4" height="4" rx="1"/><rect x="26" y="43" width="4" height="4" rx="1"/><rect x="34" y="43" width="4" height="4" rx="1"/><rect x="42" y="43" width="4" height="4" rx="1"/><rect x="50" y="43" width="4" height="4" rx="1"/></g><rect x="10" y="25" width="13" height="14" fill="var(--color-gold-light)"/><rect x="25" y="25" width="13" height="14" fill="var(--color-gold)" opacity=".75"/><rect x="40" y="25" width="13" height="14" fill="var(--color-gold-light)"/></svg>`,
    idphoto: `<svg viewBox="0 0 64 64" fill="none"><g stroke="var(--color-accent)" stroke-width="1.8" fill="#fff"><rect x="10" y="10" width="20" height="27" rx="1"/><rect x="34" y="10" width="20" height="27" rx="1"/><rect x="10" y="42" width="12" height="14" rx="1"/><rect x="26" y="42" width="12" height="14" rx="1"/><rect x="42" y="42" width="12" height="14" rx="1"/></g><g fill="var(--color-gold)"><circle cx="20" cy="21" r="4.5"/><circle cx="44" cy="21" r="4.5"/></g><g fill="var(--color-accent)" opacity=".85"><path d="M12 36c0-6 3.5-8 8-8s8 2 8 8z"/><path d="M36 36c0-6 3.5-8 8-8s8 2 8 8z"/></g></svg>`,
    magnet: `<svg viewBox="0 0 64 64" fill="none"><path d="M16 16v21a16 16 0 0 0 32 0V16" stroke="var(--color-accent)" stroke-width="10"/><path d="M16 16v21a16 16 0 0 0 32 0V16" stroke="var(--color-gold-light)" stroke-width="5"/><rect x="10.5" y="8" width="11" height="10" fill="#fff" stroke="var(--color-accent)" stroke-width="1.5"/><rect x="42.5" y="8" width="11" height="10" fill="#fff" stroke="var(--color-accent)" stroke-width="1.5"/></svg>`,
    vhs: `<svg viewBox="0 0 64 64" fill="none"><rect x="6" y="16" width="52" height="34" rx="3" fill="var(--color-accent)"/><rect x="12" y="22" width="40" height="15" rx="1" fill="#fff"/><circle cx="23" cy="29.5" r="4.5" fill="var(--color-gold-light)" stroke="var(--color-accent)" stroke-width="1.5"/><circle cx="41" cy="29.5" r="4.5" fill="var(--color-gold-light)" stroke="var(--color-accent)" stroke-width="1.5"/><rect x="20" y="41" width="24" height="9" rx="1" fill="var(--color-gold-light)"/></svg>`,
    disc: `<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="23" fill="var(--color-gold-light)" stroke="var(--color-accent)" stroke-width="2"/><circle cx="32" cy="32" r="16" fill="none" stroke="var(--color-gold)" stroke-width="3" stroke-dasharray="18 9" opacity=".8"/><circle cx="32" cy="32" r="7" fill="#fff" stroke="var(--color-accent)" stroke-width="2"/><circle cx="32" cy="32" r="2" fill="var(--color-accent)"/></svg>`,
    video: `<svg viewBox="0 0 64 64" fill="none"><rect x="18" y="6" width="28" height="52" rx="5" fill="#fff" stroke="var(--color-accent)" stroke-width="2"/><rect x="22" y="12" width="20" height="34" rx="2" fill="var(--color-gold-light)"/><path d="M29 22l10 7-10 7z" fill="var(--color-accent)"/><circle cx="32" cy="52" r="2" fill="var(--color-accent)"/></svg>`,
    // ----- Presentes e personalizados -----
    tshirt: `<svg viewBox="0 0 64 64" fill="none"><path d="M22 8L8 16l6 12 6-3v31h24V25l6 3 6-12-14-8c-2 4-6 6-10 6s-8-2-10-6z" fill="#fff" stroke="var(--color-accent)" stroke-width="2" stroke-linejoin="round"/><path d="M32 45c-6-4-8-7-8-10a4.5 4.5 0 0 1 8-2.5 4.5 4.5 0 0 1 8 2.5c0 3-2 6-8 10z" fill="var(--color-gold)"/></svg>`,
    keychain: `<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="12" r="7" stroke="var(--color-accent)" stroke-width="2.5"/><path d="M32 19v8" stroke="var(--color-accent)" stroke-width="2"/><rect x="18" y="27" width="28" height="30" rx="4" fill="var(--color-gold-light)" stroke="var(--color-accent)" stroke-width="2"/><rect x="22" y="31" width="20" height="17" rx="1" fill="#fff" stroke="var(--color-accent)" stroke-width="1.5"/><path d="M24 45l5-6 4 4 3-3 4 5z" fill="var(--color-accent)" opacity=".85"/><circle cx="28" cy="36" r="2" fill="var(--color-gold)"/></svg>`,
    cube: `<svg viewBox="0 0 64 64" fill="none"><path d="M32 6l21 11v23L32 51 11 40V17z" fill="#fff" stroke="var(--color-accent)" stroke-width="2" stroke-linejoin="round"/><path d="M32 28v23L11 40V17z" fill="var(--color-gold-light)" opacity=".8"/><path d="M11 17l21 11 21-11M32 28v23" stroke="var(--color-accent)" stroke-width="2"/><rect x="18" y="54" width="28" height="4" rx="1" fill="var(--color-accent)"/></svg>`,
    ornament: `<svg viewBox="0 0 64 64" fill="none"><path d="M32 4v7" stroke="var(--color-accent)" stroke-width="2"/><rect x="27" y="10" width="10" height="7" rx="1.5" fill="var(--color-gold)" stroke="var(--color-accent)" stroke-width="1.5"/><circle cx="32" cy="38" r="20" fill="var(--color-gold-light)" stroke="var(--color-accent)" stroke-width="2"/><circle cx="32" cy="38" r="12" fill="#fff" stroke="var(--color-gold)" stroke-width="2"/><path d="M32 31l2 4.2 4.6.6-3.3 3.2.8 4.5-4.1-2.2-4.1 2.2.8-4.5-3.3-3.2 4.6-.6z" fill="var(--color-gold)"/></svg>`,
    banner: `<svg viewBox="0 0 64 64" fill="none"><rect x="14" y="6" width="36" height="6" rx="2" fill="var(--color-accent)"/><rect x="17" y="12" width="30" height="34" fill="#fff" stroke="var(--color-accent)" stroke-width="2"/><rect x="22" y="17" width="20" height="4" rx="1" fill="var(--color-gold)"/><rect x="22" y="25" width="20" height="15" fill="var(--color-gold-light)"/><path d="M32 46v9M22 59l10-4 10 4" stroke="var(--color-accent)" stroke-width="2.5" stroke-linecap="round"/></svg>`,
    card: `<svg viewBox="0 0 64 64" fill="none"><rect x="7" y="16" width="50" height="32" rx="3" fill="#fff" stroke="var(--color-accent)" stroke-width="2"/><rect x="13" y="22" width="12" height="12" rx="2" fill="var(--color-gold)"/><rect x="30" y="23" width="21" height="3" rx="1" fill="var(--color-accent)"/><rect x="30" y="30" width="15" height="3" rx="1" fill="var(--color-gold-light)"/><rect x="13" y="40" width="38" height="3" rx="1" fill="var(--color-gold-light)"/></svg>`,
    // ----- Eletrônicos -----
    mouse: `<svg viewBox="0 0 64 64" fill="none"><rect x="18" y="7" width="28" height="50" rx="14" fill="#fff" stroke="var(--color-accent)" stroke-width="2"/><path d="M32 7v21M18 28h28" stroke="var(--color-accent)" stroke-width="2"/><rect x="29.5" y="13" width="5" height="10" rx="2.5" fill="var(--color-gold)"/></svg>`,
    speaker: `<svg viewBox="0 0 64 64" fill="none"><ellipse cx="32" cy="51" rx="21" ry="5" fill="var(--color-gold-light)"/><path d="M11 37c0-15 9-25 21-25s21 10 21 25c0 8-9 14-21 14S11 45 11 37z" fill="var(--color-accent)"/><ellipse cx="32" cy="22" rx="11" ry="4" fill="#fff" opacity=".25"/><path d="M13 41c4 6 11 8 19 8s15-2 19-8" stroke="var(--color-gold)" stroke-width="2.5" stroke-linecap="round"/></svg>`
};

/* ---------- funções do catálogo ---------- */
function brl(v) { return Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }
function produtoPorId(id) { return PRODUTOS.find(p => p.id === String(id)); }
function compravelNoSite(p) { return p.tipo === 'fixo' && typeof p.preco === 'number'; }
function precoTexto(p) {
    if (p.tipo === 'consulta' || typeof p.preco !== 'number') return 'Sob consulta';
    return p.tipo === 'a-partir' ? 'A partir de ' + brl(p.preco) : brl(p.preco);
}
function linkWhatsApp(p) {
    const msg = 'Olá! Tenho interesse em: ' + p.nome + '. Pode me passar mais informações?';
    return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg);
}

function renderThumb(p, classeExtra = '') {
    if (!p) return '';
    const fallback = ILUSTRACOES[p.icone] || '';
    const src = p.imagem || ('assets/img/produtos/' + p.id + '.jpg');
    return `<img src="${src}" alt="${escapar(p.nome)}" class="${classeExtra}" loading="lazy" onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='flex';"><span class="thumb-fallback" style="display:none;width:100%;height:100%;align-items:center;justify-content:center;">${fallback}</span>`;
}
