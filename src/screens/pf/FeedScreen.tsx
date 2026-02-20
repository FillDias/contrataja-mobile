import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, radius, typography } from '../../theme/colors';

const MOCK_POSTS = [
  {
    id: '1',
    author: 'Maria Silva',
    role: 'Desenvolvedora Full Stack',
    city: 'São Paulo, SP',
    avatar: null,
    time: '2h',
    content:
      'Acabei de concluir minha certificação em React Native! Foram meses de dedicação, mas valeu muito a pena. Agradeço a todos que me apoiaram nessa jornada. 🚀\n\nSe alguém tiver dúvidas sobre o processo, estou à disposição!',
    likes: 47,
    comments: 12,
    liked: false,
  },
  {
    id: '2',
    author: 'João Pereira',
    role: 'Eletricista Residencial',
    city: 'Campinas, SP',
    avatar: null,
    time: '5h',
    content:
      'Dica para quem está começando na área de elétrica: sempre invistam em boas ferramentas e EPI. A segurança vem sempre em primeiro lugar!\n\nCompartilhem com quem precisa dessa dica.',
    likes: 89,
    comments: 23,
    liked: true,
  },
  {
    id: '3',
    author: 'Ana Costa',
    role: 'Designer de Interiores',
    city: 'Rio de Janeiro, RJ',
    avatar: null,
    time: '8h',
    content:
      'Projeto finalizado! Transformamos um apartamento de 45m² em um espaço funcional e aconchegante. O segredo? Planejamento e escolhas inteligentes de móveis multifuncionais.',
    likes: 156,
    comments: 34,
    liked: false,
  },
  {
    id: '4',
    author: 'Carlos Mendes',
    role: 'Encanador | Prestador de Serviços',
    city: 'Belo Horizonte, MG',
    avatar: null,
    time: '1d',
    content:
      'Estamos contratando! Precisamos de 2 ajudantes com experiência em instalações hidráulicas. Região de BH. Interessados, entrem em contato pelo app.',
    likes: 32,
    comments: 18,
    liked: false,
  },
  {
    id: '5',
    author: 'Fernanda Lima',
    role: 'Professora de Inglês',
    city: 'Curitiba, PR',
    avatar: null,
    time: '1d',
    content:
      'Oferta especial! Aulas particulares de inglês para profissionais que precisam melhorar o currículo. Primeira aula gratuita para novos alunos. Vagas limitadas!',
    likes: 21,
    comments: 8,
    liked: false,
  },
];

export default function FeedScreen() {
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [newPost, setNewPost] = useState('');
  const [showCompose, setShowCompose] = useState(false);

  const handleLike = (id: string) => {
    setPosts(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p,
      ),
    );
  };

  const handlePublish = () => {
    if (!newPost.trim()) return;
    const post = {
      id: Date.now().toString(),
      author: 'Você',
      role: 'Profissional',
      city: 'Sua cidade',
      avatar: null,
      time: 'agora',
      content: newPost.trim(),
      likes: 0,
      comments: 0,
      liked: false,
    };
    setPosts(prev => [post, ...prev]);
    setNewPost('');
    setShowCompose(false);
  };

  return (
    <View style={s.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />

      {/* Header */}
      <View style={s.header}>
        <Text style={s.headerTitle}>ContrataJá</Text>
        <TouchableOpacity onPress={() => setShowCompose(!showCompose)}>
          <MaterialCommunityIcons
            name={showCompose ? 'close' : 'pencil-plus-outline'}
            size={24}
            color="#FFF"
          />
        </TouchableOpacity>
      </View>

      {/* Compose */}
      {showCompose && (
        <View style={s.composeCard}>
          <View style={s.composeHeader}>
            <View style={s.avatarSmall}>
              <MaterialCommunityIcons name="account" size={20} color={colors.textMuted} />
            </View>
            <Text style={s.composeName}>Nova publicação</Text>
          </View>
          <TextInput
            style={s.composeInput}
            placeholder="No que você está pensando?"
            placeholderTextColor={colors.textMuted}
            multiline
            value={newPost}
            onChangeText={setNewPost}
          />
          <TouchableOpacity
            style={[s.publishBtn, !newPost.trim() && s.publishBtnDisabled]}
            onPress={handlePublish}
            disabled={!newPost.trim()}
          >
            <Text style={s.publishBtnText}>Publicar</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={s.feed} showsVerticalScrollIndicator={false}>
        {posts.map(post => (
          <View key={post.id} style={s.postCard}>
            {/* Author */}
            <View style={s.postHeader}>
              <View style={s.avatar}>
                <MaterialCommunityIcons name="account" size={24} color={colors.textMuted} />
              </View>
              <View style={s.authorInfo}>
                <Text style={s.authorName}>{post.author}</Text>
                <Text style={s.authorRole}>{post.role}</Text>
                <Text style={s.postMeta}>
                  {post.city} · {post.time}
                </Text>
              </View>
              <TouchableOpacity>
                <MaterialCommunityIcons name="dots-horizontal" size={20} color={colors.textMuted} />
              </TouchableOpacity>
            </View>

            {/* Content */}
            <Text style={s.postContent}>{post.content}</Text>

            {/* Stats */}
            <View style={s.postStats}>
              <Text style={s.statsText}>
                {post.likes} curtidas · {post.comments} comentários
              </Text>
            </View>

            {/* Actions */}
            <View style={s.postActions}>
              <TouchableOpacity style={s.actionBtn} onPress={() => handleLike(post.id)}>
                <MaterialCommunityIcons
                  name={post.liked ? 'thumb-up' : 'thumb-up-outline'}
                  size={20}
                  color={post.liked ? colors.linkedin.like : colors.linkedin.comment}
                />
                <Text style={[s.actionText, post.liked && { color: colors.linkedin.like }]}>
                  Curtir
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={s.actionBtn}>
                <MaterialCommunityIcons
                  name="comment-outline"
                  size={20}
                  color={colors.linkedin.comment}
                />
                <Text style={s.actionText}>Comentar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={s.actionBtn}>
                <MaterialCommunityIcons
                  name="share-outline"
                  size={20}
                  color={colors.linkedin.comment}
                />
                <Text style={s.actionText}>Compartilhar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.primary,
    paddingTop: 48,
    paddingBottom: 14,
    paddingHorizontal: spacing.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFF',
    letterSpacing: -0.3,
  },

  composeCard: {
    backgroundColor: colors.surface,
    margin: spacing.md,
    borderRadius: radius.lg,
    padding: spacing.lg,
    elevation: 2,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  composeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  composeName: {
    ...typography.label,
    color: colors.text,
    marginLeft: spacing.sm,
  },
  composeInput: {
    ...typography.body,
    color: colors.text,
    minHeight: 80,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  publishBtn: {
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: spacing.sm + 2,
    alignItems: 'center',
  },
  publishBtnDisabled: { opacity: 0.5 },
  publishBtnText: { color: '#FFF', fontWeight: '600', fontSize: 14 },

  feed: { flex: 1 },

  postCard: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    borderRadius: radius.lg,
    padding: spacing.lg,
    elevation: 1,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authorInfo: { flex: 1, marginLeft: spacing.md },
  authorName: { fontSize: 15, fontWeight: '600', color: colors.text },
  authorRole: { fontSize: 13, color: colors.textSecondary, marginTop: 1 },
  postMeta: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  postContent: {
    ...typography.body,
    color: colors.text,
    marginTop: spacing.md,
    lineHeight: 22,
  },
  postStats: {
    marginTop: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  statsText: { fontSize: 12, color: colors.textMuted },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: spacing.sm,
  },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 4 },
  actionText: { fontSize: 13, color: colors.linkedin.comment, fontWeight: '500' },
});
