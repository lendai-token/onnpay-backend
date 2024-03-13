--
-- PostgreSQL database dump
--

-- Dumped from database version 12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)

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
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    uuid character varying(36) NOT NULL,
    name character varying(128) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(20) NOT NULL,
    avatar character varying(255),
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deleted_at timestamp without time zone,
    address character varying(255),
    state character varying(30),
    zipcode character varying(30),
    city character varying(255),
    country character varying(255),
    phone character varying(30),
    company character varying(255),
    website character varying(255),
    no character varying(11),
    activity text,
    vat_id character varying(11),
    trade_license character varying(255),
    emirates_id character varying(255),
    passport character varying(255),
    visa character varying(255),
    account_no character varying(11),
    iban character varying(255),
    swift_code character varying(30),
    bank character varying(255),
    commission numeric DEFAULT '0'::numeric,
    international_commission numeric DEFAULT '0'::numeric,
    withdrawal numeric DEFAULT '0'::numeric,
    other numeric DEFAULT '0'::numeric,
    is_delete boolean DEFAULT false NOT NULL,
    activated boolean DEFAULT false NOT NULL,
    is_profile_allowed boolean DEFAULT false NOT NULL,
    is_allow boolean DEFAULT false NOT NULL,
    api_key character varying(20)
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, uuid, name, email, password, role, avatar, created_at, updated_at, deleted_at, address, state, zipcode, city, country, phone, company, website, no, activity, vat_id, trade_license, emirates_id, passport, visa, account_no, iban, swift_code, bank, commission, international_commission, withdrawal, other, is_delete, activated, is_profile_allowed, is_allow, api_key) FROM stdin;
11	1ea586f9-3ed6-4222-b506-597c068153ee	Godwyn	godwyn@test.com	$2b$10$zi.yyPLivkz02IjxjHNhqe4zk2C586kzaguYHK9WLVRKv4s93vTby	user	https://onnpaybucket.s3.amazonaws.com/company-images/119ec11f-e425-49a2-9570-087b68e1e3fb-cricket-helmet.png	2023-05-18 21:20:18.012007	2023-05-19 15:47:50.737	\N	Global building 401, above mariyam grocerry	\N	\N	Um Al Quiwan	United Arab Emirates	056181812365	TestGodwyn	godwyn.me	05181812365	Testing	9845698585	https://onnpaybucket.s3.amazonaws.com/documents/33288c28-5527-49cf-872f-dc31e5a849e3-a.jpg	https://onnpaybucket.s3.amazonaws.com/documents/d939a7b9-fb73-4f01-8c25-8d265f4c9043-a.jpg	https://onnpaybucket.s3.amazonaws.com/documents/44978acc-6e48-4093-83fd-597a176b5ef5-a.jpg	https://onnpaybucket.s3.amazonaws.com/documents/23694cb1-779b-402c-82c0-b853e81c881a-a.jpg	00215425858	AED119858585854522	SWIFT0021	TEST	0	0	0	0	f	t	t	t	DLc2Vv)3irtWAfu&dLS*
7	125f8eeb-6730-4b11-8be2-c20170326743	Jackson	jackson.dev.0820@gmail.com	$2b$10$wOkCyHjlqxUiyXRuXNt2h.gqVuAElY9PRT6JpL2uVcdaMC4Nlqv6.	user	https://onnpaybucket.s3.amazonaws.com/company-images/fa3ba9da-3850-4e66-932d-11ecf126ec0e-logo_t4k_long.png	2023-04-25 20:38:40.407376	2023-05-22 03:06:36.784	\N	10 Havre St	\N	\N	Boston	United States	1234567890	TK-3990	https://abc.xyz	1	Good!	123	\N	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	f	t	f	f	\N
8	143cefde-e85e-4f48-a940-221b488bcc91	Godwyn Dsouza	godwyn@click2secure.me	$2b$10$E1hXeGnVOav7MsVKfKoNsutOd3z4.NQVpGM4pkvv4cF0ZZM.NrQgS	user	\N	2023-05-02 18:46:59.111869	2023-05-02 18:46:59.111869	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	f	f	f	f	\N
9	21ea3937-b506-4073-8b5b-f58d6aeebcd2	User2 Test	test2@onnpay.com	$2b$10$UmMeemE7geguLSkby62Sce1x4D1uTHZYurTN6.CSTAWWU2G9Jq6qW	user	\N	2023-05-03 00:03:00.752947	2023-05-03 00:03:00.752947	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	f	f	f	f	\N
2	817c232d-1fdf-421f-a56c-9d288790b23a	Adam Rajmuller	adam@onnpay.com	$2b$10$OauZGiwAQsFdzhpXSC3Rx.ozzKmUQlmFULrpgMzW3Xy.QCFvUdIa2	user	https://onnpaybucket.s3.amazonaws.com/user-images/ceddea03-8d20-45b5-bbac-3c95128ab1ed-Azuki%233072.jpg	2023-04-12 23:11:46.731046	2023-05-13 10:17:07.831	\N	Torpe str		1124	Budapest	Hungary	36209606333	Onnpay	https://onnpay.com	1		111	https://onnpaybucket.s3.amazonaws.com/documents/4b437f94-6efc-4e9a-85f6-5f257ce20dbe-trade.jpg	https://onnpaybucket.s3.amazonaws.com/documents/823c08b4-a801-4e9a-95a0-acf5010f2fa5-emiratesID.jpg	https://onnpaybucket.s3.amazonaws.com/documents/174736c0-fb9a-4d00-ad7a-813cd6de4122-passport.jpg	https://onnpaybucket.s3.amazonaws.com/documents/3daf0145-4424-48f0-87da-941ef97659a7-visa.jpg	123456789	0000	0000	ABC	7	5	15	10	f	t	f	t	nk4$Fio#CyVYgMfL#Kn(
10	e2186c7e-2435-44d8-a81f-6d4158cbaab7	Godwyn Dsouza	godwyn@click2secure.me	$2b$10$OodYJJuscDRMyz1c.fHcqOaFWj/dy6P/M2Bj3Hj58mlCNQRP/jFxu	user	\N	2023-05-04 17:32:11.232567	2023-05-04 17:32:11.232567	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	f	f	f	f	\N
1	24a77d1c-1431-4c44-b3ad-e4c592be05d6	Admin	admin@onnpay.com	$2b$10$AMdzl88RwOzeU.4MnWvLKeo2rtGFW0hOX92rX2EpEGqcDASkffkvu	admin	\N	2023-04-12 23:11:29.705558	2023-04-12 23:11:29.705558	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	f	t	f	f	\N
4	2b51dfc1-6763-40b1-a5a3-7dde8e5abf90	Eugene Levy	svendev520@gmail.com	$2b$10$VwDrOSLNzU0NHh0oXbm6POi6Zy7QANerXM7KVvhpmyPoUxcTnB1u.	user	https://onnpaybucket.s3.amazonaws.com/company-images/6aca49c0-b800-4ad3-becb-4bc2270b3a70-images.jpg	2023-04-17 15:35:54.25624	2023-05-23 02:42:33.519	\N	10 Havre St	\N	\N	Boston	United States	+1 336 612 4429	Onnpay	https://onnpay.com	1		123	\N	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	f	t	f	f	\N
3	15fd97be-7ef6-46ad-a025-acdc78ed0612	EugeneLevy	levyeugene0813@gmail.com	$2b$10$VH2nTEV5zANZUox95Oku2.I2biV30HsIDVZ7T8e/CGKt4fDGyNDWi	user	\N	2023-04-17 15:26:07.843928	2023-04-17 15:26:07.843928	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	f	f	f	f	\N
5	e34f7d25-a851-466e-9143-7ba510bf4b31	Test User	test@onnpay.com	$2b$10$FJLzHVZhaJLvL3eTgSKnlulhzQJgQ2ohqgVd0EpzZ2YxLA03/q6D2	user	\N	2023-04-17 15:39:14.950486	2023-04-17 15:39:14.950486	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	f	f	f	f	\N
6	21fc854c-4d36-45b1-910e-33e24930851f	Jackson Lee	test1@onnpay.com	$2b$10$lvQsQD46Oz84Z.kL7q4P2elv/7YhEQv9pFtVkblTzmf/Mm7qQfawO	user	\N	2023-04-17 17:03:51.761687	2023-04-17 17:03:51.761687	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	f	f	f	f	\N
\.


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 11, true);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

