-- CreateTable
CREATE TABLE "Record" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lineId" INTEGER NOT NULL,
    "statusCd" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "msgId" TEXT NOT NULL,
    "deletedAt" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
