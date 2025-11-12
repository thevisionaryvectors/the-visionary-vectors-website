import { redirect } from 'next/navigation';

export default function ArticleExamplePage() {
  // Redirect to the dynamic article page with a default slug
  redirect('/article/perceptron-learning');
}
