using { bookstore as db } from '../db/schema';

service CatalogService {

    entity Books as projection on db.Books {
        ID,
        title,
        author,
        price,
        stock,
        status
    };

    action approveBook(ID : UUID) returns String;

   

}