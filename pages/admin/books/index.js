import BookCardTable from "components/Cards/BookCardTable";
import Admin from "layouts/Admin";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Index() {
  const router = useRouter();
  const { jwt } = useSelector((state) => state.storeManage);
  const [books, setBooks] = useState([]);
  const [pagination, setPagination] = useState({});
  const page = router.query.page;
  useEffect(() => {
    if (jwt == "null") return router.push("/auth/login");
    async function getBooks() {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/books?pageNum=${page}`,
        {}
      );
      if (res.status == 200) {
        if (res.data.success == true) {
          const data = res.data.data.books;
          setBooks(data);
          const pagination = res.data.data.pagination;
          setPagination(pagination);
        }
      }
    }
    getBooks();
  }, [jwt, page]);
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <BookCardTable title="Books" books={books} pagination={pagination} />
        </div>
      </div>
    </>
  );
}

Index.layout = Admin;
