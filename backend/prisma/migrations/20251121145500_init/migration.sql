-- CreateTable
CREATE TABLE "links" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(8) NOT NULL,
    "target_url" TEXT NOT NULL,
    "total_clicks" INTEGER NOT NULL DEFAULT 0,
    "last_clicked_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "links_code_key" ON "links"("code");

-- CreateIndex
CREATE INDEX "links_code_idx" ON "links"("code");
