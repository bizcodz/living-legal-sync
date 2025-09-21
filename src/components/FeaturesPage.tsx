import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heading, Text, Box } from "@chakra-ui/react"; // Assuming you have Chakra UI or similar

const FeaturesPage = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Heading className="text-3xl font-bold mb-4">Features</Heading>
        <Text className="text-muted-foreground">This is where you would describe your app's features in detail.</Text>
      </div>
    </main>
    <Footer />
  </div>
);

export default FeaturesPage;