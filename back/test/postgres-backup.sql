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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Post; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public."Post" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    title character varying(255) NOT NULL,
    content text,
    published boolean DEFAULT false NOT NULL,
    "authorId" integer NOT NULL
);


ALTER TABLE public."Post" OWNER TO "user";

--
-- Name: Post_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public."Post_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Post_id_seq" OWNER TO "user";

--
-- Name: Post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public."Post_id_seq" OWNED BY public."Post".id;


--
-- Name: Profile; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public."Profile" (
    id integer NOT NULL,
    bio text,
    "userId" integer NOT NULL
);


ALTER TABLE public."Profile" OWNER TO "user";

--
-- Name: Profile_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public."Profile_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Profile_id_seq" OWNER TO "user";

--
-- Name: Profile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public."Profile_id_seq" OWNED BY public."Profile".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public."User" (
    id integer NOT NULL,
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
-- Name: Post id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Post" ALTER COLUMN id SET DEFAULT nextval('public."Post_id_seq"'::regclass);


--
-- Name: Profile id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Profile" ALTER COLUMN id SET DEFAULT nextval('public."Profile_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: Post; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public."Post" (id, "createdAt", "updatedAt", title, content, published, "authorId") FROM stdin;
1	2023-02-08 10:04:49.212	2023-02-08 10:04:49.212	Hello World	\N	f	1
2	2023-02-08 10:11:39.865	2023-02-08 10:11:39.865	Hello World	\N	f	8
3	2023-02-08 10:12:02.613	2023-02-08 10:12:02.613	Hello World	\N	f	10
\.


--
-- Data for Name: Profile; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public."Profile" (id, bio, "userId") FROM stdin;
1	I like turtles	1
2	I like turtles	8
3	I like turtles	10
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public."User" (id, email, name) FROM stdin;
1	alice@prisma.io	Alice
8	perry@prisma.io	Perry
10	erwan@prisma.io	Erwan
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
fe95a83a-1449-4cf0-8860-c6d4fcff2092	3de9e0465a22932a5a941f8f9a96591ac8be6d3e3bcbd66871fde9b0902d33c0	2023-02-08 09:34:22.13476+00	20230208093422_init	\N	\N	2023-02-08 09:34:22.06642+00	1
\.


--
-- Name: Post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public."Post_id_seq"', 3, true);


--
-- Name: Profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public."Profile_id_seq"', 3, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public."User_id_seq"', 10, true);


--
-- Name: Post Post_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_pkey" PRIMARY KEY (id);


--
-- Name: Profile Profile_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Profile"
    ADD CONSTRAINT "Profile_pkey" PRIMARY KEY (id);


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
-- Name: Profile_userId_key; Type: INDEX; Schema: public; Owner: user
--

CREATE UNIQUE INDEX "Profile_userId_key" ON public."Profile" USING btree ("userId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: user
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Post Post_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Profile Profile_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Profile"
    ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

