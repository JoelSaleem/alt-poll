PGDMP          &                y            polls    11.10    13.1     i           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            j           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            k           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            l           1262    16384    polls    DATABASE     Z   CREATE DATABASE polls WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';
    DROP DATABASE polls;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                postgres    false            m           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   postgres    false    3            �            1259    16401    Polls    TABLE        CREATE TABLE public."Polls" (
    id bigint NOT NULL,
    title character varying NOT NULL,
    description character varying,
    closed boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id bigint NOT NULL
);
    DROP TABLE public."Polls";
       public            postgres    false    3            �            1259    16397    Polls_id_seq    SEQUENCE     w   CREATE SEQUENCE public."Polls_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Polls_id_seq";
       public          postgres    false    3    200            n           0    0    Polls_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Polls_id_seq" OWNED BY public."Polls".id;
          public          postgres    false    198            �            1259    16399    Polls_user_id_seq    SEQUENCE     |   CREATE SEQUENCE public."Polls_user_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."Polls_user_id_seq";
       public          postgres    false    200    3            o           0    0    Polls_user_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."Polls_user_id_seq" OWNED BY public."Polls".user_id;
          public          postgres    false    199            �            1259    16385    Users    TABLE     �   CREATE TABLE public."Users" (
    id bigint NOT NULL,
    name character varying NOT NULL,
    google_id character varying NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
    DROP TABLE public."Users";
       public            postgres    false    3            �            1259    16392    Users_id_seq    SEQUENCE     w   CREATE SEQUENCE public."Users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Users_id_seq";
       public          postgres    false    196    3            p           0    0    Users_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;
          public          postgres    false    197            �
           2604    16404    Polls id    DEFAULT     h   ALTER TABLE ONLY public."Polls" ALTER COLUMN id SET DEFAULT nextval('public."Polls_id_seq"'::regclass);
 9   ALTER TABLE public."Polls" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    198    200    200            �
           2604    16407    Polls user_id    DEFAULT     r   ALTER TABLE ONLY public."Polls" ALTER COLUMN user_id SET DEFAULT nextval('public."Polls_user_id_seq"'::regclass);
 >   ALTER TABLE public."Polls" ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    200    199    200            �
           2604    16394    Users id    DEFAULT     h   ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);
 9   ALTER TABLE public."Users" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    197    196            �
           2606    16412    Polls Polls_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Polls"
    ADD CONSTRAINT "Polls_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Polls" DROP CONSTRAINT "Polls_pkey";
       public            postgres    false    200            �
           2606    16396    Users Users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            postgres    false    196            �
           2606    16413    Polls user_id    FK CONSTRAINT     p   ALTER TABLE ONLY public."Polls"
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public."Users"(id);
 9   ALTER TABLE ONLY public."Polls" DROP CONSTRAINT user_id;
       public          postgres    false    200    2794    196           