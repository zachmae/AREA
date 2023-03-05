--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Debian 15.1-1.pgdg110+1)
-- Dumped by pg_dump version 15.1 (Debian 15.1-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: ActionE; Type: TYPE; Schema: public; Owner: user
--

CREATE TYPE public."ActionE" AS ENUM (
    'CRON',
    'WEBHOOK'
);


ALTER TYPE public."ActionE" OWNER TO "user";

--
-- Name: ReactionE; Type: TYPE; Schema: public; Owner: user
--

CREATE TYPE public."ReactionE" AS ENUM (
    'API',
    'MAIL'
);


ALTER TYPE public."ReactionE" OWNER TO "user";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Action; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public."Action" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255),
    "serviceId" integer NOT NULL,
    type public."ActionE" DEFAULT 'WEBHOOK'::public."ActionE" NOT NULL,
    "urlCallback" text,
    active boolean DEFAULT true NOT NULL
);


ALTER TABLE public."Action" OWNER TO "user";

--
-- Name: Action_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public."Action_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Action_id_seq" OWNER TO "user";

--
-- Name: Action_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public."Action_id_seq" OWNED BY public."Action".id;


--
-- Name: Area; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public."Area" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    title text,
    "actionId" integer NOT NULL,
    "reactionId" integer NOT NULL,
    "authorId" integer NOT NULL,
    active boolean DEFAULT true NOT NULL
);


ALTER TABLE public."Area" OWNER TO "user";

--
-- Name: Area_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public."Area_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Area_id_seq" OWNER TO "user";

--
-- Name: Area_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public."Area_id_seq" OWNED BY public."Area".id;


--
-- Name: Auth; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public."Auth" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "userId" integer NOT NULL,
    "serviceId" integer NOT NULL,
    authentified boolean DEFAULT false NOT NULL,
    token character varying(255),
    "refreshToken" character varying(255)
);


ALTER TABLE public."Auth" OWNER TO "user";

--
-- Name: Auth_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public."Auth_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Auth_id_seq" OWNER TO "user";

--
-- Name: Auth_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public."Auth_id_seq" OWNED BY public."Auth".id;


--
-- Name: Reaction; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public."Reaction" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255),
    "serviceId" integer NOT NULL,
    type public."ReactionE" DEFAULT 'MAIL'::public."ReactionE" NOT NULL
);


ALTER TABLE public."Reaction" OWNER TO "user";

--
-- Name: Reaction_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public."Reaction_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Reaction_id_seq" OWNER TO "user";

--
-- Name: Reaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public."Reaction_id_seq" OWNED BY public."Reaction".id;


--
-- Name: Service; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public."Service" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public."Service" OWNER TO "user";

--
-- Name: Service_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public."Service_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Service_id_seq" OWNER TO "user";

--
-- Name: Service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public."Service_id_seq" OWNED BY public."Service".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    email text NOT NULL,
    name text
);


ALTER TABLE public."User" OWNER TO "user";

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_id_seq" OWNER TO "user";

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO "user";

--
-- Name: Action id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Action" ALTER COLUMN id SET DEFAULT nextval('public."Action_id_seq"'::regclass);


--
-- Name: Area id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Area" ALTER COLUMN id SET DEFAULT nextval('public."Area_id_seq"'::regclass);


--
-- Name: Auth id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Auth" ALTER COLUMN id SET DEFAULT nextval('public."Auth_id_seq"'::regclass);


--
-- Name: Reaction id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Reaction" ALTER COLUMN id SET DEFAULT nextval('public."Reaction_id_seq"'::regclass);


--
-- Name: Service id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Service" ALTER COLUMN id SET DEFAULT nextval('public."Service_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: Action; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public."Action" (id, "createdAt", "updatedAt", name, description, "serviceId", type, "urlCallback", active) FROM stdin;
\.


--
-- Data for Name: Area; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public."Area" (id, "createdAt", "updatedAt", title, "actionId", "reactionId", "authorId", active) FROM stdin;
\.


--
-- Data for Name: Auth; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public."Auth" (id, "createdAt", "updatedAt", "userId", "serviceId", authentified, token, "refreshToken") FROM stdin;
\.


--
-- Data for Name: Reaction; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public."Reaction" (id, "createdAt", "updatedAt", name, description, "serviceId", type) FROM stdin;
\.


--
-- Data for Name: Service; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public."Service" (id, "createdAt", "updatedAt", name) FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public."User" (id, "createdAt", "updatedAt", email, name) FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
e4b6e610-e781-42ab-8f79-9631cb27e89d	899eeaaac9d565ddbad169cd1c52976a1cc3ed1256f9cdeb103c3dce981f386e	2023-02-09 15:47:45.948514+00	20230209154745_init	\N	\N	2023-02-09 15:47:45.802279+00	1
\.


--
-- Name: Action_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public."Action_id_seq"', 1, false);


--
-- Name: Area_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public."Area_id_seq"', 1, false);


--
-- Name: Auth_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public."Auth_id_seq"', 1, false);


--
-- Name: Reaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public."Reaction_id_seq"', 1, false);


--
-- Name: Service_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public."Service_id_seq"', 1, false);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public."User_id_seq"', 1, false);


--
-- Name: Action Action_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Action"
    ADD CONSTRAINT "Action_pkey" PRIMARY KEY (id);


--
-- Name: Area Area_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Area"
    ADD CONSTRAINT "Area_pkey" PRIMARY KEY (id);


--
-- Name: Auth Auth_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Auth"
    ADD CONSTRAINT "Auth_pkey" PRIMARY KEY (id);


--
-- Name: Reaction Reaction_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Reaction"
    ADD CONSTRAINT "Reaction_pkey" PRIMARY KEY (id);


--
-- Name: Service Service_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Service"
    ADD CONSTRAINT "Service_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Action_id_key; Type: INDEX; Schema: public; Owner: user
--

CREATE UNIQUE INDEX "Action_id_key" ON public."Action" USING btree (id);


--
-- Name: Area_id_key; Type: INDEX; Schema: public; Owner: user
--

CREATE UNIQUE INDEX "Area_id_key" ON public."Area" USING btree (id);


--
-- Name: Auth_id_key; Type: INDEX; Schema: public; Owner: user
--

CREATE UNIQUE INDEX "Auth_id_key" ON public."Auth" USING btree (id);


--
-- Name: Auth_refreshToken_key; Type: INDEX; Schema: public; Owner: user
--

CREATE UNIQUE INDEX "Auth_refreshToken_key" ON public."Auth" USING btree ("refreshToken");


--
-- Name: Auth_token_key; Type: INDEX; Schema: public; Owner: user
--

CREATE UNIQUE INDEX "Auth_token_key" ON public."Auth" USING btree (token);


--
-- Name: Reaction_id_key; Type: INDEX; Schema: public; Owner: user
--

CREATE UNIQUE INDEX "Reaction_id_key" ON public."Reaction" USING btree (id);


--
-- Name: Service_id_key; Type: INDEX; Schema: public; Owner: user
--

CREATE UNIQUE INDEX "Service_id_key" ON public."Service" USING btree (id);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: user
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_id_key; Type: INDEX; Schema: public; Owner: user
--

CREATE UNIQUE INDEX "User_id_key" ON public."User" USING btree (id);


--
-- Name: Action Action_serviceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Action"
    ADD CONSTRAINT "Action_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES public."Service"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Area Area_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Area"
    ADD CONSTRAINT "Area_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Auth Auth_serviceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Auth"
    ADD CONSTRAINT "Auth_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES public."Service"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Auth Auth_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Auth"
    ADD CONSTRAINT "Auth_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Reaction Reaction_serviceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Reaction"
    ADD CONSTRAINT "Reaction_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES public."Service"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

