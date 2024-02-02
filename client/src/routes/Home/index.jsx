import ImagePoster from "@/components/ImagePoster";
import indianaJonesPoster from "@/assets/img/indiana-jones-poster.jpg";
import starWarsPoster from "@/assets/img/star-wars-poster.jpg";
import AdminButton from '@/components/AdminButton';
import CredsDisplay from '@/components/CredsDisplay';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="relative">
      <div className="absolute">
        <CredsDisplay />
      </div>

      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-gray-700 to-black" >
        <div className="w-full h-screen flex flex-col items-center justify-center gap-10">
          <h3 className="text-3xl font-bold">Welcome to WebCinema!</h3>
          <div className="w-3/5 h-3/5 flex justify-center items-center gap-24">
            <Link to="/movies/star-wars" className="block h-full">
              <ImagePoster src={starWarsPoster} alt="Star Wars" />
            </Link>
            <Link to="/movies/indiana-jones" className="block h-full">
              <ImagePoster src={indianaJonesPoster} alt="Indiana Jones" />
            </Link>
          </div>

          <AdminButton />
        </div>
      </div>
    </div>
  );
}
