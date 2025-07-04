CREATE DATABASE auth
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LOCALE_PROVIDER = 'libc'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE auth (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),  -- UUID ngẫu nhiên
    username VARCHAR(100),
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255), 
    provider VARCHAR(50) DEFAULT 'local',
    provider_id VARCHAR(255), 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng verify
CREATE TABLE verify (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),  -- UUID ngẫu nhiên
    email VARCHAR(150) NOT NULL,
    code VARCHAR(6) NOT NULL,
    used TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL
);
