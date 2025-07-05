-- Tạo user
CREATE USER auth WITH PASSWORD '123456';

-- Tạo database
CREATE DATABASE auth
    WITH
    OWNER = auth
    ENCODING = 'UTF8'
    LOCALE_PROVIDER = 'libc'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- Tạo extension uuid
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- Tạo schema admin
CREATE SCHEMA admin;

-- Tạo bảng users trong schema public (mặc định)
CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),  -- UUID ngẫu nhiên
    username VARCHAR(100),
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255), 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng admins trong schema admin
CREATE TABLE admin.admins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),  -- UUID ngẫu nhiên
    username VARCHAR(100),
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255), 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cấp quyền sử dụng schema
GRANT USAGE ON SCHEMA public, admin TO auth;

-- Cấp quyền thao tác bảng (tuỳ bạn muốn SELECT, INSERT, v.v.)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.users TO auth;
GRANT SELECT ON admin.admins TO auth;

