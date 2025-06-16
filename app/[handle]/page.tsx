import { MainLayout } from "@/components/layout/main-layout";
import { createMetadata } from "@/lib/metadata";
import { store } from "@/lib/store";
import { getTurtle } from "@/services/api";

type Props = {
  params: Promise<{ handle: string }>;
};

async function fetchTurtle(handle: string) {
  if (!handle || isNaN(Number(handle))) return null;

  const { data } = await store.dispatch(
    getTurtle.initiate({ id: Number(handle) }),
  );

  return data ?? null;
}

export async function generateMetadata({ params }: Props) {
  const { handle } = await params;
  const turtle = await fetchTurtle(handle);

  if (!handle || isNaN(Number(handle))) {
    return createMetadata({
      title: "Geçersiz Kaplumbağa ID",
      description: "Lütfen geçerli bir kaplumbağa ID'si girin.",
    });
  }

  if (!turtle) {
    return createMetadata({
      title: "Kaplumbağa Bulunamadı",
      description: "Belirtilen kaplumbağa ID'si bulunamadı.",
    });
  }

  return createMetadata({
    title: `Kaplumbağa: ${turtle.name}`,
    description: `Kaplumbağa ID: ${turtle.id}`,
    keywords: ["kaplumbağa", "turtle", "turtle details"],
  });
}

export default async function Turte({ params }: Props) {
  const { handle } = await params;
  const turtle = await fetchTurtle(handle);

  if (!handle || isNaN(Number(handle))) {
    return <div>Geçersiz Kaplumbağa ID</div>;
  }

  if (!turtle) {
    return <div>Kaplumbağa Bulunamadı</div>;
  }

  return (
    <MainLayout>
      <p className="text-lg">
        Kaplumbağa {turtle.id}, {turtle.name}
      </p>
    </MainLayout>
  );
}
