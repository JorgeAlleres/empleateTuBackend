import { HttpException } from "../exceptions/httpException";
import { Category, PrismaClient } from "prisma/prisma-client";

const prisma = new PrismaClient()
export class CategoryService {
    static async getAll() {
        const findCategorys = await prisma.category.findMany()
        return findCategorys
    }
    static async getById(id: number) {
        const findOffert = await prisma.category.findUnique({ where: { id: id } });
        if (!findOffert) throw new HttpException(404, "Category doesn't exist");
    
        return findOffert;
    }
    static async create(category: Category) {
        const findCategory = await prisma.category.findFirst({ where: { name: category.name } })
        if (findCategory) throw new HttpException(409, `Category ${category.name} already exists`)
        return await prisma.category.create({data: {...category}})
    }
    static async delete(idCategory: number) {
        const categoryDeleted = await prisma.category.delete({ where: { id: idCategory } })
        if (!categoryDeleted) throw new HttpException(409, `CategoryID ${idCategory} doesnt exists`)
        return categoryDeleted
    }
    static async update(idCategory: number, category: Category) {
        const categoryUpdate = await prisma.category.update({ 
            where: { id: idCategory},
            data: {...category}
        })
        if (!categoryUpdate) throw new HttpException(409, `CategoryID ${idCategory} doesnt exists`)
        return categoryUpdate
    }
}