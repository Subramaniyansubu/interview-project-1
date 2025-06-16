import { CreateTurtle } from "@/components/features/create-turtle";
import { MainLayout } from "@/components/layout/main-layout";
import { TurtleList } from "@/components/features/turtle-list";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Kaplumbağa Oluştur",
  description: "Kaplumbağa oluşturma ve listeleme uygulaması",
  keywords: ["kaplumbağa", "turtle", "create turtle", "turtle list"],
});

export default function Home() {
  return (
    <MainLayout>
      <CreateTurtle />
      <TurtleList />
    </MainLayout>
  );
}
