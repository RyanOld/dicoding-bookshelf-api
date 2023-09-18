import type { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
import { getBooksData } from "./utils/dataManager";

export const getBookWithId = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject | undefined> => {
  // input checks :
  const { bookId } = request.params;
  const booksData = getBooksData();
  // console.log(booksData);

  let response: ResponseObject | undefined;
  booksData.forEach((book) => {
    if (book.id === bookId) {
      response = h
        .response({
          status: "success",
          data: {
            book,
          },
        })
        .code(200);
    }
  });

  // if matching book id is not found from iterations, return 404.
  if (response === undefined) {
    response = h
      .response({
        status: "fail",
        message: "Buku tidak ditemukan",
      })
      .code(404);
  }
  return response;
};