-- ============================================================
-- MIRONGA ECOSYSTEM — Supabase Schema
-- Cobre: Ateliê Luz das Almas + Casarão da Mironga
-- ============================================================
-- Executar no SQL Editor do Supabase (Project → SQL Editor → New query)
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- EXTENSÕES
-- ────────────────────────────────────────────────────────────
create extension if not exists "pgcrypto";

-- ────────────────────────────────────────────────────────────
-- PERFIS (estende auth.users do Supabase)
-- ────────────────────────────────────────────────────────────
create table if not exists profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  name       text,
  phone      text,
  avatar_url text,
  role       text not null default 'customer'
               check (role in ('customer', 'admin', 'superadmin')),
  created_at timestamptz not null default now()
);

-- Trigger: cria perfil automaticamente quando um user é criado
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id) values (new.id);
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ────────────────────────────────────────────────────────────
-- CONFIGURAÇÕES DO SITE
-- ────────────────────────────────────────────────────────────
create table if not exists site_settings (
  key         text primary key,
  value       jsonb not null,
  description text,
  updated_at  timestamptz not null default now()
);

insert into site_settings (key, value, description) values
  ('whatsapp_atelie',      '"5511999999999"',              'WhatsApp do Ateliê'),
  ('whatsapp_casarao',     '"5511999999999"',              'WhatsApp do Casarão'),
  ('instagram_atelie',     '"@atelie.luzdasalmas"',        'Instagram do Ateliê'),
  ('instagram_casarao',    '"@casarao.damironga"',         'Instagram do Casarão'),
  ('shipping_free_from',   '150',                          'Frete grátis acima de R$ X (Casarão)'),
  ('pix_key_atelie',       '"pix@luzdasalmas.com"',        'Chave Pix do Ateliê'),
  ('pix_key_casarao',      '"pix@casarao.com"',            'Chave Pix do Casarão')
on conflict (key) do nothing;

-- ════════════════════════════════════════════════════════════
-- ATELIÊ LUZ DAS ALMAS
-- ════════════════════════════════════════════════════════════

-- ── Tipos de peça (configuráveis pelo admin) ──────────────
create table if not exists atelie_clothing_types (
  id          uuid primary key default gen_random_uuid(),
  label       text not null,
  description text,
  icon        text,    -- chave do ícone SVG (ex: "skirt", "shirt")
  active      boolean not null default true,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

insert into atelie_clothing_types (label, icon, sort_order) values
  ('Saia',     'skirt',   1),
  ('Camisa',   'shirt',   2),
  ('Conjunto', 'set',     3),
  ('Calça',    'pants',   4),
  ('Vestido',  'dress',   5),
  ('Blusa',    'blouse',  6),
  ('Shorts',   'shorts',  7),
  ('Macacão',  'overall', 8)
on conflict do nothing;

-- ── Tecidos (configuráveis pelo admin) ────────────────────
create table if not exists atelie_fabrics (
  id          uuid primary key default gen_random_uuid(),
  label       text not null,
  description text,
  available   boolean not null default true,
  created_at  timestamptz not null default now()
);

insert into atelie_fabrics (label) values
  ('Algodão'), ('Linho'), ('Renda'), ('Malha'),
  ('Cetim'), ('Viscose'), ('Crochê')
on conflict do nothing;

-- ── Estilos (configuráveis pelo admin) ───────────────────
create table if not exists atelie_styles (
  id          uuid primary key default gen_random_uuid(),
  label       text not null,
  description text,
  available   boolean not null default true,
  created_at  timestamptz not null default now()
);

insert into atelie_styles (label) values
  ('Afro'), ('Étnico'), ('Casual'), ('Festivo'),
  ('Cerimonial'), ('Boho')
on conflict do nothing;

-- ── Paleta de cores (configuráveis pelo admin) ───────────
create table if not exists atelie_colors (
  id          uuid primary key default gen_random_uuid(),
  label       text not null,
  hex_value   text not null,
  available   boolean not null default true,
  created_at  timestamptz not null default now()
);

insert into atelie_colors (label, hex_value) values
  ('Branco',    '#F5F0E8'), ('Creme',     '#E8DCC8'), ('Bege',      '#C8B89A'),
  ('Terracota', '#C06040'), ('Amarelo',   '#F0C040'), ('Dourado',   '#D4A030'),
  ('Laranja',   '#E87020'), ('Vermelho',  '#B83020'), ('Rosa',      '#D07080'),
  ('Roxo',      '#703090'), ('Azul',      '#2060A0'), ('Verde',     '#307050'),
  ('Preto',     '#1A1A1A'), ('Grafite',   '#404040')
on conflict do nothing;

-- ── Peças de pronta entrega ───────────────────────────────
create table if not exists atelie_items (
  id               uuid primary key default gen_random_uuid(),
  name             text not null,
  description      text,
  price            numeric(10,2) not null check (price >= 0),
  whatsapp_number  text,
  active           boolean not null default true,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create table if not exists atelie_item_photos (
  id          uuid primary key default gen_random_uuid(),
  item_id     uuid not null references atelie_items(id) on delete cascade,
  url         text not null,
  sort_order  int not null default 0
);

create table if not exists atelie_item_sizes (
  item_id uuid not null references atelie_items(id) on delete cascade,
  size    text not null,
  primary key (item_id, size)
);

-- ── Provador Inteligente — sessões de geração por IA ─────
create table if not exists atelie_provador_sessions (
  id                  uuid primary key default gen_random_uuid(),
  -- Identificação (opcional — o usuário pode não estar logado)
  user_id             uuid references profiles(id) on delete set null,
  user_name           text,
  user_phone          text,
  -- Seleções do provador
  clothing_type_id    uuid references atelie_clothing_types(id) on delete set null,
  fabric_id           uuid references atelie_fabrics(id) on delete set null,
  style_id            uuid references atelie_styles(id) on delete set null,
  color_primary       text,
  color_secondary     text,
  color_accent        text,
  description         text,
  -- Imagens (Storage: atelie-provador-*)
  user_photo_url      text not null,
  generated_image_url text,
  -- Estado
  status              text not null default 'pending'
                        check (status in ('pending','generating','done','failed')),
  error_message       text,
  whatsapp_sent       boolean not null default false,
  created_at          timestamptz not null default now()
);

-- ── Pedidos personalizados (nascidos do provador ou diretos) ──
create table if not exists atelie_custom_orders (
  id                    uuid primary key default gen_random_uuid(),
  provador_session_id   uuid references atelie_provador_sessions(id) on delete set null,
  customer_name         text not null,
  customer_phone        text not null,
  clothing_description  text,
  generated_image_url   text,
  agreed_price          numeric(10,2) check (agreed_price >= 0),
  estimated_days        int check (estimated_days > 0),
  status                text not null default 'negotiating'
                          check (status in ('negotiating','confirmed','in_progress','done','cancelled')),
  notes                 text,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

-- ════════════════════════════════════════════════════════════
-- CASARÃO DA MIRONGA (e-commerce de produtos afro-religiosos)
-- ════════════════════════════════════════════════════════════

-- ── Categorias ────────────────────────────────────────────
create table if not exists casarao_categories (
  id          uuid primary key default gen_random_uuid(),
  label       text not null,
  slug        text not null unique,
  description text,
  icon_url    text,
  parent_id   uuid references casarao_categories(id) on delete set null,
  sort_order  int not null default 0,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

insert into casarao_categories (label, slug, sort_order) values
  ('Guias & Colares',   'guias-colares',  1),
  ('Pulseiras',         'pulseiras',      2),
  ('Velas & Incensos',  'velas-incensos', 3),
  ('Ervas & Banhos',    'ervas-banhos',   4),
  ('Estatuetas',        'estatuetas',     5),
  ('Roupas de Santo',   'roupas-de-santo',6),
  ('Acessórios Ritual', 'acessorios',     7),
  ('Livros & Oráculos', 'livros-oraculos',8)
on conflict do nothing;

-- ── Produtos ──────────────────────────────────────────────
create table if not exists casarao_products (
  id                uuid primary key default gen_random_uuid(),
  category_id       uuid references casarao_categories(id) on delete set null,
  name              text not null,
  slug              text not null unique,
  description       text,
  price             numeric(10,2) not null check (price >= 0),
  compare_at_price  numeric(10,2) check (compare_at_price >= 0), -- preço riscado
  stock_quantity    int not null default 0 check (stock_quantity >= 0),
  sku               text unique,
  whatsapp_number   text,
  weight_grams      int,          -- para cálculo de frete
  active            boolean not null default true,
  featured          boolean not null default false,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create table if not exists casarao_product_photos (
  id          uuid primary key default gen_random_uuid(),
  product_id  uuid not null references casarao_products(id) on delete cascade,
  url         text not null,
  alt         text,
  sort_order  int not null default 0
);

create table if not exists casarao_product_tags (
  product_id  uuid not null references casarao_products(id) on delete cascade,
  tag         text not null,
  primary key (product_id, tag)
);

-- ── Pedidos ───────────────────────────────────────────────
create table if not exists casarao_orders (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid references profiles(id) on delete set null,
  customer_name    text not null,
  customer_email   text,
  customer_phone   text,
  shipping_address jsonb, -- { street, number, complement, city, state, zip, country }
  subtotal         numeric(10,2) not null check (subtotal >= 0),
  shipping_cost    numeric(10,2) not null default 0 check (shipping_cost >= 0),
  total            numeric(10,2) not null check (total >= 0),
  status           text not null default 'pending'
                     check (status in ('pending','confirmed','shipped','delivered','cancelled')),
  payment_method   text check (payment_method in ('pix','whatsapp_negotiation','credit_card','other')),
  payment_status   text not null default 'awaiting'
                     check (payment_status in ('awaiting','paid','refunded')),
  notes            text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create table if not exists casarao_order_items (
  id            uuid primary key default gen_random_uuid(),
  order_id      uuid not null references casarao_orders(id) on delete cascade,
  product_id    uuid references casarao_products(id) on delete set null,
  product_name  text not null,  -- snapshot no momento do pedido
  unit_price    numeric(10,2) not null check (unit_price >= 0),
  quantity      int not null check (quantity > 0),
  subtotal      numeric(10,2) not null check (subtotal >= 0)
);

-- ════════════════════════════════════════════════════════════
-- ÍNDICES
-- ════════════════════════════════════════════════════════════
create index if not exists idx_atelie_items_active        on atelie_items(active);
create index if not exists idx_atelie_provador_user       on atelie_provador_sessions(user_id);
create index if not exists idx_casarao_products_category  on casarao_products(category_id);
create index if not exists idx_casarao_products_active    on casarao_products(active);
create index if not exists idx_casarao_products_featured  on casarao_products(featured);
create index if not exists idx_casarao_orders_user        on casarao_orders(user_id);
create index if not exists idx_casarao_orders_status      on casarao_orders(status);

-- ════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS)
-- ════════════════════════════════════════════════════════════
-- Habilitar RLS em todas as tabelas que têm dados sensíveis
alter table profiles                    enable row level security;
alter table atelie_items                enable row level security;
alter table atelie_item_photos          enable row level security;
alter table atelie_item_sizes           enable row level security;
alter table atelie_provador_sessions    enable row level security;
alter table atelie_custom_orders        enable row level security;
alter table casarao_products            enable row level security;
alter table casarao_product_photos      enable row level security;
alter table casarao_product_tags        enable row level security;
alter table casarao_orders              enable row level security;
alter table casarao_order_items         enable row level security;

-- Helper: verifica se o usuário logado é admin
create or replace function is_admin()
returns boolean language plpgsql security definer as $$
begin
  return exists (
    select 1 from profiles
    where id = auth.uid()
      and role in ('admin', 'superadmin')
  );
end;
$$;

-- ── Perfis ────────────────────────────────────────────────
create policy "Usuário vê apenas o próprio perfil"
  on profiles for select using (auth.uid() = id);

create policy "Usuário edita apenas o próprio perfil"
  on profiles for update using (auth.uid() = id);

create policy "Admin vê todos os perfis"
  on profiles for select using (is_admin());

-- ── Ateliê: leitura pública de peças ativas ───────────────
create policy "Público lê peças ativas do ateliê"
  on atelie_items for select using (active = true);

create policy "Público lê fotos das peças ativas"
  on atelie_item_photos for select
  using (exists (select 1 from atelie_items where id = item_id and active = true));

create policy "Público lê tamanhos das peças ativas"
  on atelie_item_sizes for select
  using (exists (select 1 from atelie_items where id = item_id and active = true));

create policy "Admin gerencia peças do ateliê"
  on atelie_items for all using (is_admin());

create policy "Admin gerencia fotos das peças"
  on atelie_item_photos for all using (is_admin());

create policy "Admin gerencia tamanhos das peças"
  on atelie_item_sizes for all using (is_admin());

-- ── Provador: qualquer pessoa pode criar sessão, só vê a própria ──
create policy "Usuário cria sessão no provador"
  on atelie_provador_sessions for insert with check (true);

create policy "Usuário vê suas sessões"
  on atelie_provador_sessions for select
  using (user_id is null or user_id = auth.uid());

create policy "Admin vê todas as sessões do provador"
  on atelie_provador_sessions for select using (is_admin());

create policy "Admin atualiza sessões do provador"
  on atelie_provador_sessions for update using (is_admin());

-- ── Pedidos personalizados ────────────────────────────────
create policy "Qualquer um pode criar pedido customizado (via WA)"
  on atelie_custom_orders for insert with check (true);

create policy "Admin gerencia pedidos customizados"
  on atelie_custom_orders for all using (is_admin());

-- ── Casarão: leitura pública de produtos ativos ───────────
create policy "Público lê produtos ativos do casarão"
  on casarao_products for select using (active = true);

create policy "Público lê fotos de produtos ativos"
  on casarao_product_photos for select
  using (exists (select 1 from casarao_products where id = product_id and active = true));

create policy "Público lê tags de produtos ativos"
  on casarao_product_tags for select
  using (exists (select 1 from casarao_products where id = product_id and active = true));

create policy "Admin gerencia produtos do casarão"
  on casarao_products for all using (is_admin());

create policy "Admin gerencia fotos dos produtos"
  on casarao_product_photos for all using (is_admin());

create policy "Admin gerencia tags dos produtos"
  on casarao_product_tags for all using (is_admin());

-- ── Pedidos do Casarão ────────────────────────────────────
create policy "Qualquer um pode criar pedido"
  on casarao_orders for insert with check (true);

create policy "Usuário vê seus próprios pedidos"
  on casarao_orders for select
  using (user_id is null or user_id = auth.uid());

create policy "Admin vê e gerencia todos os pedidos"
  on casarao_orders for all using (is_admin());

create policy "Usuário vê itens dos seus pedidos"
  on casarao_order_items for select
  using (exists (
    select 1 from casarao_orders
    where id = order_id
      and (user_id is null or user_id = auth.uid())
  ));

create policy "Admin vê todos os itens de pedidos"
  on casarao_order_items for all using (is_admin());

-- ════════════════════════════════════════════════════════════
-- STORAGE BUCKETS
-- ════════════════════════════════════════════════════════════
-- Execute DEPOIS de criar os buckets no painel Storage do Supabase.
-- 
-- Buckets necessários:
--   1. atelie-item-photos        (público)
--   2. atelie-provador-uploads   (privado)
--   3. atelie-provador-results   (privado)
--   4. casarao-product-photos    (público)
--
-- Criar via painel: Storage → New bucket → preencher nome e visibilidade.
--
-- Políticas de storage (adicionar via painel ou SQL abaixo):

insert into storage.buckets (id, name, public) values
  ('atelie-item-photos',      'atelie-item-photos',      true),
  ('atelie-provador-uploads', 'atelie-provador-uploads', false),
  ('atelie-provador-results', 'atelie-provador-results', false),
  ('casarao-product-photos',  'casarao-product-photos',  true)
on conflict (id) do nothing;

-- Política storage: leitura pública para buckets públicos
create policy "Público lê fotos do ateliê"
  on storage.objects for select
  using (bucket_id = 'atelie-item-photos');

create policy "Público lê fotos do casarão"
  on storage.objects for select
  using (bucket_id = 'casarao-product-photos');

create policy "Admin faz upload de fotos do ateliê"
  on storage.objects for insert
  with check (bucket_id = 'atelie-item-photos' and is_admin());

create policy "Admin faz upload de fotos do casarão"
  on storage.objects for insert
  with check (bucket_id = 'casarao-product-photos' and is_admin());

create policy "Qualquer um faz upload da foto para o provador"
  on storage.objects for insert
  with check (bucket_id = 'atelie-provador-uploads');

create policy "Servidor grava resultado do provador"
  on storage.objects for insert
  with check (bucket_id = 'atelie-provador-results');

create policy "Usuário acessa seus resultados do provador"
  on storage.objects for select
  using (bucket_id in ('atelie-provador-uploads', 'atelie-provador-results'));

-- ════════════════════════════════════════════════════════════
-- FUNÇÕES UTILITÁRIAS
-- ════════════════════════════════════════════════════════════

-- Atualiza updated_at automaticamente
create or replace function touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace trigger atelie_items_updated
  before update on atelie_items
  for each row execute procedure touch_updated_at();

create or replace trigger atelie_custom_orders_updated
  before update on atelie_custom_orders
  for each row execute procedure touch_updated_at();

create or replace trigger casarao_products_updated
  before update on casarao_products
  for each row execute procedure touch_updated_at();

create or replace trigger casarao_orders_updated
  before update on casarao_orders
  for each row execute procedure touch_updated_at();
