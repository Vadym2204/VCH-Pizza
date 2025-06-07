import AddToCartButton from "@/components/menu/AddToCartButton";
import Image from "next/image";

export default function MenuItemTile({onAddToCart, onClick, ...item}) {
  const {image, description, name, basePrice, sizes, extraIngredientPrices} = item;
  const hasSizesOrExtras = sizes?.length > 0 || extraIngredientPrices?.length > 0;
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center flex flex-col h-full
      group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
      <div onClick={onClick} className="text-center flex-shrink-0">
        <Image 
          width={100} 
          height={100} 
          src={image} 
          className="max-h-24 w-auto block mx-auto" 
          alt="pizza"
        />
      </div>
      <h4 className="font-semibold text-xl my-3 line-clamp-1">{name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3 flex-grow">
        {description}
      </p>
      <div className="mt-4">
        <AddToCartButton
          image={image}
          hasSizesOrExtras={hasSizesOrExtras}
          onClick={onAddToCart}
          basePrice={basePrice}
          className="w-full h-10"
        />
      </div>
    </div>
  );
}