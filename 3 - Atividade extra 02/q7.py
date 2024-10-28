class ControleDeAudio:
    # Inicializa o volume com o valor 2
    def __init__(self):
        self.volume = 2

    def aumentar_volume(self):
        if self.volume < 10:
            self.volume += 1

    def diminuir_volume(self):
        if self.volume > 0:
            self.volume -= 1

    def ler_volume(self):
        return self.volume



meu_controle = ControleDeAudio()


meu_controle.aumentar_volume()
print("Volume após aumentar:", meu_controle.ler_volume())


meu_controle.diminuir_volume()
print("Volume após diminuir:", meu_controle.ler_volume())
