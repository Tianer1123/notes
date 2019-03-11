from numpy import *
import operator

def createDataSet():
    group = array([[1.0, 1.1], [1.0, 1.1], [0, 0], [0, 0.1]])
    labels = ['A', 'A', 'B', 'B']
    return group, labels


def classify0(inX, dataSet, labels, k):
    """
    :param inX: 用于分类的输入向量
    :param dataSet: 训练样本集
    :param labels: 标签向量
    :param k: 选择最近邻居的数目
    :return: 发生频率最高的元素标签
    """
    dataSetSize = dataSet.shape[0]
    # 距离计算
    diffMat = tile(inX, (dataSetSize, 1)) - dataSet
    sqDiffMat = diffMat**2
    sqDistances = sqDiffMat.sum(axis=1)
    distances = sqDistances**0.5
    print(distances)

    sortedDistIndicies = distances.argsort()  # 返回数组从下到大的索引值
    classCount = {}
    # 选择距离最小的k个点
    for i in range(k):
        voteIlabel = labels[sortedDistIndicies[i]]  # 排序后前k个标签值
        classCount[voteIlabel] = classCount.get(voteIlabel, 0) + 1  # 统计前k个标签出现的个数(频率)
    # 排序
    sortedClassCount = sorted(classCount.items(), key=operator.itemgetter(1), reverse=True)
    return sortedClassCount[0][0]  # 返回频率最高的标签(分类)


group, labels = createDataSet()
print(classify0([0, 0], group, labels, 3))
