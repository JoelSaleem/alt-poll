PGDMP     %    (                y            votes    11.10    13.1 )    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16386    votes    DATABASE     Z   CREATE DATABASE votes WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';
    DROP DATABASE votes;
                postgres    false            �            1259    16395    Options    TABLE     $  CREATE TABLE public."Options" (
    id bigint NOT NULL,
    title character varying NOT NULL,
    description character varying,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    poll_id bigint NOT NULL,
    user_id bigint NOT NULL,
    version bigint DEFAULT 0 NOT NULL
);
    DROP TABLE public."Options";
       public            postgres    false            �            1259    16403    Options_id_seq    SEQUENCE     y   CREATE SEQUENCE public."Options_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Options_id_seq";
       public          postgres    false    196            �           0    0    Options_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Options_id_seq" OWNED BY public."Options".id;
          public          postgres    false    197            �            1259    16405    Options_poll_id_seq    SEQUENCE     ~   CREATE SEQUENCE public."Options_poll_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."Options_poll_id_seq";
       public          postgres    false    196            �           0    0    Options_poll_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public."Options_poll_id_seq" OWNED BY public."Options".poll_id;
          public          postgres    false    198            �            1259    16407    Options_user_id_seq    SEQUENCE     ~   CREATE SEQUENCE public."Options_user_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."Options_user_id_seq";
       public          postgres    false    196            �           0    0    Options_user_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public."Options_user_id_seq" OWNED BY public."Options".user_id;
          public          postgres    false    199            �            1259    16409    Otps    TABLE     �   CREATE TABLE public."Otps" (
    id character varying NOT NULL,
    version bigint NOT NULL,
    user_id bigint NOT NULL,
    poll_id bigint NOT NULL,
    expired boolean DEFAULT false NOT NULL
);
    DROP TABLE public."Otps";
       public            postgres    false            �            1259    16416    Polls    TABLE     G  CREATE TABLE public."Polls" (
    id bigint NOT NULL,
    title character varying NOT NULL,
    description character varying,
    closed boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id bigint NOT NULL,
    open boolean DEFAULT false,
    version bigint DEFAULT 0 NOT NULL
);
    DROP TABLE public."Polls";
       public            postgres    false            �            1259    16426    Polls_id_seq    SEQUENCE     w   CREATE SEQUENCE public."Polls_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Polls_id_seq";
       public          postgres    false    201            �           0    0    Polls_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Polls_id_seq" OWNED BY public."Polls".id;
          public          postgres    false    202            �            1259    16428    Polls_user_id_seq    SEQUENCE     |   CREATE SEQUENCE public."Polls_user_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."Polls_user_id_seq";
       public          postgres    false    201            �           0    0    Polls_user_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."Polls_user_id_seq" OWNED BY public."Polls".user_id;
          public          postgres    false    203            �            1259    16430    Users    TABLE     �   CREATE TABLE public."Users" (
    id bigint NOT NULL,
    name character varying NOT NULL,
    google_id character varying NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
    DROP TABLE public."Users";
       public            postgres    false            �            1259    16437    Users_id_seq    SEQUENCE     w   CREATE SEQUENCE public."Users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Users_id_seq";
       public          postgres    false    204            �           0    0    Users_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;
          public          postgres    false    205            �            1259    16488    Votes    TABLE     �   CREATE TABLE public."Votes" (
    id bigint NOT NULL,
    option_id bigint NOT NULL,
    rank bigint NOT NULL,
    voter_id character varying NOT NULL
);
    DROP TABLE public."Votes";
       public            postgres    false            �            1259    24695    Votes_id_seq    SEQUENCE     �   ALTER TABLE public."Votes" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Votes_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    206            �
           2604    16439 
   Options id    DEFAULT     l   ALTER TABLE ONLY public."Options" ALTER COLUMN id SET DEFAULT nextval('public."Options_id_seq"'::regclass);
 ;   ALTER TABLE public."Options" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    197    196            �
           2604    16440    Options poll_id    DEFAULT     v   ALTER TABLE ONLY public."Options" ALTER COLUMN poll_id SET DEFAULT nextval('public."Options_poll_id_seq"'::regclass);
 @   ALTER TABLE public."Options" ALTER COLUMN poll_id DROP DEFAULT;
       public          postgres    false    198    196            �
           2604    16441    Options user_id    DEFAULT     v   ALTER TABLE ONLY public."Options" ALTER COLUMN user_id SET DEFAULT nextval('public."Options_user_id_seq"'::regclass);
 @   ALTER TABLE public."Options" ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    199    196                       2604    16442    Polls id    DEFAULT     h   ALTER TABLE ONLY public."Polls" ALTER COLUMN id SET DEFAULT nextval('public."Polls_id_seq"'::regclass);
 9   ALTER TABLE public."Polls" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    202    201                       2604    16443    Polls user_id    DEFAULT     r   ALTER TABLE ONLY public."Polls" ALTER COLUMN user_id SET DEFAULT nextval('public."Polls_user_id_seq"'::regclass);
 >   ALTER TABLE public."Polls" ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    203    201                       2604    16444    Users id    DEFAULT     h   ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);
 9   ALTER TABLE public."Users" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    204            	           2606    16446    Options Options_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Options"
    ADD CONSTRAINT "Options_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Options" DROP CONSTRAINT "Options_pkey";
       public            postgres    false    196                       2606    16448    Otps Otps_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Otps"
    ADD CONSTRAINT "Otps_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Otps" DROP CONSTRAINT "Otps_pkey";
       public            postgres    false    200                       2606    16450    Polls Polls_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Polls"
    ADD CONSTRAINT "Polls_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Polls" DROP CONSTRAINT "Polls_pkey";
       public            postgres    false    201                       2606    16452    Users Users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            postgres    false    204                       2606    16492    Votes Votes_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Votes"
    ADD CONSTRAINT "Votes_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Votes" DROP CONSTRAINT "Votes_pkey";
       public            postgres    false    206            
           1259    16453    fki_user_for_option    INDEX     L   CREATE INDEX fki_user_for_option ON public."Options" USING btree (user_id);
 '   DROP INDEX public.fki_user_for_option;
       public            postgres    false    196                       1259    16454    poll_id for option    INDEX     M   CREATE INDEX "poll_id for option" ON public."Options" USING btree (poll_id);
 (   DROP INDEX public."poll_id for option";
       public            postgres    false    196                       2606    16455    Options Options_poll_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Options"
    ADD CONSTRAINT "Options_poll_id_fkey" FOREIGN KEY (poll_id) REFERENCES public."Polls"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 J   ALTER TABLE ONLY public."Options" DROP CONSTRAINT "Options_poll_id_fkey";
       public          postgres    false    196    201    2831                       2606    16493    Votes opt_for_vote    FK CONSTRAINT     �   ALTER TABLE ONLY public."Votes"
    ADD CONSTRAINT opt_for_vote FOREIGN KEY (option_id) REFERENCES public."Options"(id) NOT VALID;
 >   ALTER TABLE ONLY public."Votes" DROP CONSTRAINT opt_for_vote;
       public          postgres    false    196    206    2825                       2606    16460    Otps poll_id_for_otp    FK CONSTRAINT     �   ALTER TABLE ONLY public."Otps"
    ADD CONSTRAINT poll_id_for_otp FOREIGN KEY (poll_id) REFERENCES public."Polls"(id) NOT VALID;
 @   ALTER TABLE ONLY public."Otps" DROP CONSTRAINT poll_id_for_otp;
       public          postgres    false    200    201    2831                       2606    16465    Options user_for_option    FK CONSTRAINT     �   ALTER TABLE ONLY public."Options"
    ADD CONSTRAINT user_for_option FOREIGN KEY (user_id) REFERENCES public."Users"(id) NOT VALID;
 C   ALTER TABLE ONLY public."Options" DROP CONSTRAINT user_for_option;
       public          postgres    false    2833    204    196                       2606    16470    Polls user_id    FK CONSTRAINT     p   ALTER TABLE ONLY public."Polls"
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public."Users"(id);
 9   ALTER TABLE ONLY public."Polls" DROP CONSTRAINT user_id;
       public          postgres    false    201    2833    204                       2606    16475    Otps user_id_for_otp    FK CONSTRAINT     �   ALTER TABLE ONLY public."Otps"
    ADD CONSTRAINT user_id_for_otp FOREIGN KEY (user_id) REFERENCES public."Users"(id) NOT VALID;
 @   ALTER TABLE ONLY public."Otps" DROP CONSTRAINT user_id_for_otp;
       public          postgres    false    200    2833    204           