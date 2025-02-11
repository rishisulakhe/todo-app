-- CreateTable
CREATE TABLE "todo_app"."File" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "todoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "todo_app"."File" ADD CONSTRAINT "File_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "todo_app"."Todo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
