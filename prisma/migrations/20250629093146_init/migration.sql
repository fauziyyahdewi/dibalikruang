-- CreateTable
CREATE TABLE "cache" (
    "key" VARCHAR(255) NOT NULL,
    "value" TEXT NOT NULL,
    "expiration" INTEGER NOT NULL,

    CONSTRAINT "cache_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "cache_locks" (
    "key" VARCHAR(255) NOT NULL,
    "owner" VARCHAR(255) NOT NULL,
    "expiration" INTEGER NOT NULL,

    CONSTRAINT "cache_locks_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "client_finance" (
    "id" SERIAL NOT NULL,
    "user_id" BIGINT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "client_finance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_finance_detail" (
    "id" SERIAL NOT NULL,
    "client_finance_id" INTEGER,
    "user_id" INTEGER,
    "finance_category_id" INTEGER,
    "finance_type_id" INTEGER,
    "name" VARCHAR(255) NOT NULL,
    "amount" BIGINT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "client_finance_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" SERIAL NOT NULL,
    "user_id" BIGINT,
    "birthday" TIMESTAMP(6),
    "is_married" BOOLEAN,
    "dependents_note" VARCHAR(255),
    "dependents" INTEGER,
    "jobs" VARCHAR(255),
    "domisili" VARCHAR(255),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "phone_number" VARCHAR(20),

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "failed_jobs" (
    "id" BIGSERIAL NOT NULL,
    "uuid" VARCHAR(255) NOT NULL,
    "connection" TEXT NOT NULL,
    "queue" TEXT NOT NULL,
    "payload" TEXT NOT NULL,
    "exception" TEXT NOT NULL,
    "failed_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "failed_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "finance_category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "finance_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "finance_recommendation" (
    "id" SERIAL NOT NULL,
    "finance_type_id" INTEGER,
    "finance_subtype_id" INTEGER,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "finance_recommendation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "finance_subtype" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "finance_subtype_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "finance_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "finance_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "financial_advisors" (
    "id" SERIAL NOT NULL,
    "user_id" BIGINT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "financial_advisors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fincheck_result" (
    "id" SERIAL NOT NULL,
    "user_id" BIGINT,
    "financial_advisor_id" INTEGER,
    "fincheck_result_type_id" INTEGER,
    "client_finance_id" INTEGER,
    "percent" INTEGER NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fincheck_result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fincheck_result_detail" (
    "id" SERIAL NOT NULL,
    "fincheck_result_id" INTEGER,
    "fincheck_result_category_id" INTEGER,
    "fincheck_result_type_id" INTEGER,
    "value" INTEGER NOT NULL,
    "position_detail" VARCHAR(255),
    "description" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fincheck_result_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fincheck_result_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),

    CONSTRAINT "fincheck_result_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_batches" (
    "id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "total_jobs" INTEGER NOT NULL,
    "pending_jobs" INTEGER NOT NULL,
    "failed_jobs" INTEGER NOT NULL,
    "failed_job_ids" TEXT NOT NULL,
    "options" TEXT,
    "cancelled_at" INTEGER,
    "created_at" INTEGER NOT NULL,
    "finished_at" INTEGER,

    CONSTRAINT "job_batches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs" (
    "id" BIGSERIAL NOT NULL,
    "queue" VARCHAR(255) NOT NULL,
    "payload" TEXT NOT NULL,
    "attempts" SMALLINT NOT NULL,
    "reserved_at" INTEGER,
    "available_at" INTEGER NOT NULL,
    "created_at" INTEGER NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "migrations" (
    "id" SERIAL NOT NULL,
    "migration" VARCHAR(255) NOT NULL,
    "batch" INTEGER NOT NULL,

    CONSTRAINT "migrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "password_reset_tokens" (
    "email" VARCHAR(255) NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0),

    CONSTRAINT "password_reset_tokens_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "personal_access_tokens" (
    "id" BIGSERIAL NOT NULL,
    "tokenable_type" VARCHAR(255) NOT NULL,
    "tokenable_id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "token" VARCHAR(64) NOT NULL,
    "abilities" TEXT,
    "last_used_at" TIMESTAMP(0),
    "expires_at" TIMESTAMP(0),
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "personal_access_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "result_category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "result_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" VARCHAR(255) NOT NULL,
    "user_id" BIGINT,
    "ip_address" VARCHAR(45),
    "user_agent" TEXT,
    "payload" TEXT NOT NULL,
    "last_activity" INTEGER NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "email_verified_at" TIMESTAMP(0),
    "password" VARCHAR(255) NOT NULL,
    "remember_token" VARCHAR(100),
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "image" VARCHAR(255),
    "role" TEXT NOT NULL DEFAULT 'user',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_finance_summary" (
    "id" SERIAL NOT NULL,
    "client_finance_id" INTEGER,
    "user_id" INTEGER,
    "finance_category_id" INTEGER,
    "amount" BIGINT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "client_finance_summary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fincheck_result_category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "fincheck_result_category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_user_id_unique" ON "clients"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "failed_jobs_uuid_unique" ON "failed_jobs"("uuid");

-- CreateIndex
CREATE INDEX "jobs_queue_index" ON "jobs"("queue");

-- CreateIndex
CREATE UNIQUE INDEX "personal_access_tokens_token_unique" ON "personal_access_tokens"("token");

-- CreateIndex
CREATE INDEX "personal_access_tokens_tokenable_type_tokenable_id_index" ON "personal_access_tokens"("tokenable_type", "tokenable_id");

-- CreateIndex
CREATE INDEX "sessions_last_activity_index" ON "sessions"("last_activity");

-- CreateIndex
CREATE INDEX "sessions_user_id_index" ON "sessions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_unique" ON "User"("email");

-- AddForeignKey
ALTER TABLE "client_finance" ADD CONSTRAINT "client_finance_users_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client_finance_detail" ADD CONSTRAINT "client_finance_detail_client_finance_fkey" FOREIGN KEY ("client_finance_id") REFERENCES "client_finance"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client_finance_detail" ADD CONSTRAINT "client_finance_detail_finance_category_fkey" FOREIGN KEY ("finance_category_id") REFERENCES "finance_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client_finance_detail" ADD CONSTRAINT "client_finance_detail_type_fkey" FOREIGN KEY ("finance_type_id") REFERENCES "finance_type"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_users_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "finance_recommendation" ADD CONSTRAINT "finance_recommendation_subtype_fkey" FOREIGN KEY ("finance_subtype_id") REFERENCES "finance_subtype"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "finance_recommendation" ADD CONSTRAINT "finance_recommendation_type_fkey" FOREIGN KEY ("finance_type_id") REFERENCES "finance_type"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "financial_advisors" ADD CONSTRAINT "financial_advisors_users_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fincheck_result" ADD CONSTRAINT "fincheck_result_client_finance_fkey" FOREIGN KEY ("client_finance_id") REFERENCES "client_finance"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fincheck_result" ADD CONSTRAINT "fincheck_result_financial_advisor_id_fkey" FOREIGN KEY ("financial_advisor_id") REFERENCES "financial_advisors"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fincheck_result" ADD CONSTRAINT "fincheck_result_fincheck_result_type_fkey" FOREIGN KEY ("fincheck_result_type_id") REFERENCES "fincheck_result_type"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fincheck_result" ADD CONSTRAINT "fincheck_result_user_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fincheck_result_detail" ADD CONSTRAINT "fincheck_result_detail_fincheck_result_category_id_fkey" FOREIGN KEY ("fincheck_result_category_id") REFERENCES "fincheck_result_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fincheck_result_detail" ADD CONSTRAINT "fincheck_result_detail_fincheck_result_fkey" FOREIGN KEY ("fincheck_result_id") REFERENCES "fincheck_result"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fincheck_result_detail" ADD CONSTRAINT "fincheck_result_detail_fincheck_result_type_id_fkey" FOREIGN KEY ("fincheck_result_type_id") REFERENCES "fincheck_result_type"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client_finance_summary" ADD CONSTRAINT "client_finance_category_id_fkey" FOREIGN KEY ("finance_category_id") REFERENCES "finance_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client_finance_summary" ADD CONSTRAINT "client_finance_summary_client_finance_fkey" FOREIGN KEY ("client_finance_id") REFERENCES "client_finance"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
